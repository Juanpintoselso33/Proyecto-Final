from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON
from datetime import datetime
from sqlalchemy.orm import validates

db = SQLAlchemy()


class OrderProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Float, nullable=True) 
    extras = db.Column(JSON, nullable=True)   

    product = db.relationship('Product', back_populates='order_products')
    order = db.relationship('Order', back_populates='items')

    def serialize(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'cost': self.cost,
            'extras': self.extras,
            'product_name': self.product.name  # Agregamos el nombre del producto
        }
    

   

# Definición de la clase User


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)   
    role = db.Column(db.String(20), default='customer')

    orders = db.relationship('Order', back_populates='user')  # Nueva relación

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "email": self.email,
            "role": self.role,
            "id" : self.id
        }

# Definición de la clase Product


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    stars = db.Column(db.Integer)
    img_url = db.Column(db.String(120), nullable=False)
    category = db.Column(db.String(40), nullable=True)  # Nueva columna agregada
    its_promo = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    order_products = db.relationship('OrderProduct', back_populates='product')

    def __repr__(self):
        return f'Id-{self.id}: {self.name}'

    def serialize(self):
        return {
            'id': self.id,
            'cost': self.cost,
            'name': self.name,
            'description': self.description,
            'stars': self.stars,
            'img_url': self.img_url,
            'category': self.category,  # Nueva propiedad agregada
            'promo':  self.its_promo
        }

# Definición de la clase Order


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_cost = db.Column(db.Float, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # Nueva columna

    items = db.relationship('OrderProduct', back_populates='order')
    user = db.relationship('User', back_populates='orders')  # Nueva relación

    def calculate_total_cost(self):
        self.total_cost = 0
        for item in self.items:
            # Calcular el costo del item sin tener en cuenta si es una promoción o no
            item_cost = item.product.cost * item.quantity

            # Añadir el costo de los extras, si los hay
            if item.extras is not None:
                for extra in item.extras:
                    item_cost += extra['price']

            # Asignar el costo calculado al item
            item.cost = item_cost

            # Sumar el costo del item al costo total del pedido
            self.total_cost += item_cost

        # Guardar el cambio en el costo total en la base de datos
        db.session.commit()

        # Devolver el costo total calculado
        return self.total_cost

    def __repr__(self):
        return f"Orden Nro. {self.id}"

    def serialize(self):
        total_cost_with_extras = 0
        total_cost_without_extras = 0

        serialized_items = []

        for item in self.items:
            cost_with_extras = item.cost  # Costo individual con extras
            cost_without_extras = item.product.cost * item.quantity  # Costo individual sin extras

            total_cost_with_extras += cost_with_extras
            total_cost_without_extras += cost_without_extras

            serialized_item = {
                "product_id": item.product_id,
                "quantity": item.quantity,
                "cost_with_extras": cost_with_extras,  # Costo individual con extras
                "cost_without_extras": cost_without_extras,  # Costo individual sin extras
                "extras": item.extras,
                "product_name": item.product.name
            }

            serialized_items.append(serialized_item)

        return {
            "id": self.id,
            "total_cost_with_extras": total_cost_with_extras,
            "total_cost_without_extras": total_cost_without_extras,
            "timestamp": self.timestamp,
            "user_id": self.user_id,
            "items": serialized_items  # Lista de items serializados con costo individual
        }