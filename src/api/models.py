from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# Definición de la tabla OrderProduct para el manejo de items
class OrderProduct(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    quantity = db.Column(db.Integer)

    product = db.relationship('Product', back_populates='order_products')
    order = db.relationship('Order', back_populates='items')

# Definición de la clase User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email
        }

# Definición de la clase Product
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cost = db.Column(db.Float, unique=False, nullable=False)
    name = db.Column(db.String(40), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=False)
    stars = db.Column(db.Integer)
    img_url = db.Column(db.String(120), unique=False, nullable=False)

    order_products = db.relationship('OrderProduct', back_populates='product')

    def __repr__(self):
        return f'<Product {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "cost": self.cost,
            "name": self.name,
            "description": self.description,
            "stars": self.stars,
            "img_url": self.img_url
        }

# Definición de la clase Order
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    total_cost = db.Column(db.Float, nullable=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    items = db.relationship('OrderProduct', back_populates='order')

    def calculate_total_cost(self):
        self.total_cost = sum(item.product.cost * item.quantity for item in self.items)

    def __repr__(self):
        return f'<Order {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "total_cost": self.total_cost,
            "timestamp": self.timestamp,
            "items": [{"product_id": item.product_id, "quantity": item.quantity} for item in self.items]
        }
