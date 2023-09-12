"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Product  
from api.utils import generate_sitemap, APIException  
from flask_jwt_extended import JWTManager, jwt_required, create_access_token

api = Blueprint('api', __name__)

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'tu_clave_secreta'
jwt = JWTManager(app) 


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# ----------------------------- ENDPOINTS USUARIOS -----------------------------------------------------------------

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@api.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

@api.route('/user/<int:user_id>', methods=['GET'])
@jwt_required()
def get_user_data(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({'error': 'User not found'}), 404

@api.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validación básica
    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Email y contraseña son requeridos'}), 400
    
    email = data['email']
    password = data['password']

    # Verificar si el usuario ya existe
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'El email ya está registrado'}), 400

    new_user = User(email=email, password=password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201

@api.route('/user/<int:user_id>', methods=['PUT'])
#@jwt_required()
def edit_user(user_id):
    data = request.get_json()
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.password = data['password']  
    if 'role' in data:
        user.role = data['role']

    db.session.commit()

    return jsonify({'message': 'Usuario actualizado exitosamente'}), 200


@api.route('/user/<int:user_id>', methods=['DELETE'])
#@jwt_required()
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'Usuario no encontrado'}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'Usuario eliminado exitosamente'}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="This is a protected route.")








































#------------------------------- FIN ENDPOINTS USER -----------------------------------------------------------------

# ----------------------------- ENDPOINTS PRODUCTOS------------------------------------------------------------------

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


app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run()































































# -------------------------- FIN ENDPOINTS PRODUCTOS --------------------------