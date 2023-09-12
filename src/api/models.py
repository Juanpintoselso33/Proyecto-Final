from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import validates

db = SQLAlchemy()


class OrderProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Float, nullable=True)
    its_promo = db.Column(db.Boolean(), unique=False, nullable=False, default=False)

    product = db.relationship('Product', back_populates='order_products')
    order = db.relationship('Order', back_populates='items')

    def __repr__(self):
        promo_prefix = "PROMO: " if self.its_promo else ""
        return f"{promo_prefix}{self.product.name} x {self.quantity} = {self.cost}"

    @validates('cost')
    def validate_cost(self, key, cost):
        if self.product is None:
            raise ValueError("Product must be set before validating the cost.")

        if self.its_promo is False:
            return self.product.cost * self.quantity
        elif self.its_promo is True and cost is not None:
            return cost
        else:
            raise ValueError("Si es una promoción, el costo debe ser proporcionado por el usuario.")

   

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
            'category': self.category  # Nueva propiedad agregada
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
            if item.its_promo is False:
                item.cost = item.product.cost * item.quantity
            elif item.its_promo is True and item.cost is None:
                raise ValueError("Si es una promoción, el costo debe ser proporcionado por el usuario.")
            self.total_cost += item.cost
        db.session.commit()

    def __repr__(self):
        return f"Orden Nro. {self.id}"

    def serialize(self):
        return {
            "id": self.id,
            "total_cost": self.total_cost,
            "timestamp": self.timestamp,
            "user_id": self.user_id,  # Añadido el id del usuario
            "items": [{"product_id": item.product_id, "quantity": item.quantity, "cost": item.cost} for item in self.items]
        }
