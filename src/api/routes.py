"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Product
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Listar productos
@api.route('/products', methods=['GET'])
def handle_list_products():
    products_query = Product.query.all()  # Consulta para obtener todos los productos
    products_list = [product.serialize() for product in products_query]

    return jsonify(products_list), 200

#Ver producto individual
@api.route('/products/<int:product_id>', methods=['GET'])
def handle_get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404

    return jsonify(product.serialize()), 200






































