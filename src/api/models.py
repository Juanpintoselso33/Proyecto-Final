from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON
from datetime import datetime

db = SQLAlchemy()

# Tabla de asociación entre OrderProduct y Extra
order_product_extras = db.Table('order_product_extras',
    db.Column('order_product_id', db.Integer, db.ForeignKey('order_product.id'), primary_key=True),
    db.Column('extra_id', db.Integer, db.ForeignKey('extra.id'), primary_key=True),    
)

class OrderProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer, nullable=False)
    cost = db.Column(db.Float, nullable=True)
    extras = db.relationship('Extra', secondary=order_product_extras, lazy='subquery',
                             backref=db.backref('order_products', lazy=True))

    product = db.relationship('Product', back_populates='order_products')
    order = db.relationship('Order', back_populates='items')

    def serialize(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'cost': self.cost,
            'extras': [extra.serialize() for extra in self.extras],
            'product_name': self.product.name
        }

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    role = db.Column(db.String(20), default='customer')

    orders = db.relationship('Order', back_populates='user')
    messages = db.relationship('Message', back_populates='user') 

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "email": self.email,
            "role": self.role,
            "id" : self.id
        }

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(db.Float, nullable=False)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(120), nullable=False)
    stars = db.Column(db.Integer)
    img_url = db.Column(db.String(500), nullable=False)
    category = db.Column(db.String(40), nullable=True)
    its_promo = db.Column(db.Boolean(), nullable=False, default=False)
    its_daily_menu = db.Column(db.Boolean(), nullable=False, default=False)


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
            'category': self.category,
            'its_promo':  self.its_promo,
            'its_daily_menu':  self.its_daily_menu
        }

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_cost = db.Column(db.Float, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    items = db.relationship('OrderProduct', back_populates='order')
    user = db.relationship('User', back_populates='orders')

    def calculate_total_cost(self):
        self.total_cost = 0
        for item in self.items:
            item_cost = item.product.cost * item.quantity

            if item.extras:
                for extra in item.extras:
                    item_cost += (extra.price * item.quantity)
            
            item.cost = item_cost
            self.total_cost += item_cost

        db.session.commit()
        return self.total_cost

    def __repr__(self):
        return f"Orden Nro. {self.id}"

    def serialize(self):
        total_cost_with_extras = 0
        total_cost_without_extras = 0
        serialized_items = []

        for item in self.items:
            cost_with_extras = item.cost
            cost_without_extras = item.product.cost * item.quantity

            total_cost_with_extras += cost_with_extras
            total_cost_without_extras += cost_without_extras

            serialized_item = {
                "product_id": item.product_id,
                "quantity": item.quantity,
                "cost_with_extras": cost_with_extras,
                "cost_without_extras": cost_without_extras,
                "extras": [extra.serialize() for extra in item.extras],
                "product_name": item.product.name
            }

            serialized_items.append(serialized_item)

        return {
            "id": self.id,
            "total_cost_with_extras": total_cost_with_extras,
            "total_cost_without_extras": total_cost_without_extras,
            "timestamp": self.timestamp,
            "user_id": self.user_id,
            "items": serialized_items
        }

class Extra(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    price = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(40))
    categories = db.Column(JSON)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'type': self.type,
            'categories': self.categories
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    subject = db.Column(db.String(120), nullable=False)
    message = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # Opcional, en caso de que el mensaje esté asociado a un usuario registrado

    user = db.relationship('User', back_populates='messages')  # Opcional, en caso de que quieras una relación inversa

    def __repr__(self):
        return f'<Message {self.id} from {self.email}>'

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'timestamp': self.timestamp,
            'user_id': self.user_id  
        }