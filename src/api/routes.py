"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Product, Order, OrderProduct  
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

 
@api.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        # Verificar si el email ya está registrado
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({'error': 'El correo electrónico ya está registrado'}), 400

        # Crear un nuevo usuario
        new_user = User(email=email, password=password, role=role)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=email)

        return jsonify({
            'success': True,
            'message': 'Usuario registrado exitosamente',
            'access_token': access_token,
            'id': new_user.id
        }), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400
 
 
# Endpoint para iniciar sesión
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token, id=user.id), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401


# Endpoint para obtener todos los usuarios
@api.route('/users', methods=['GET'])
def get_all_users():
    try:
        users_query = User.query.all()
        users_list = [user.serialize() for user in users_query]

        return jsonify(users_list), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


# Endpoint para obtener un usuario por su ID
@api.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'error': 'User not found'}), 404

        return jsonify(user.serialize()), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


# Endpoint para eliminar un usuario por su ID
@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)

        if user is None:
            return jsonify({"success": False, "message": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()

        return jsonify({"success": True, "message": "User deleted"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


# ----------------------------- ENDPOINTS PRODUCTOS ------------------------------------------------------------------

# Endpoint para obtener todos los productos o agregar uno nuevo
@api.route('/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'GET':
        products_query = Product.query.all()
        products_list = [product.serialize() for product in products_query]
        return jsonify(products_list), 200

    elif request.method == 'POST':
        try:
            data = request.json
            new_product = Product(
                cost=data['cost'],
                name=data['name'],
                description=data['description'],
                stars=data.get('stars', None),
                img_url=data['img_url'],
                category=data.get('category', None)
            )
            db.session.add(new_product)
            db.session.commit()
            return jsonify({"success": True, "message": "Product added", "product": new_product.serialize()}), 201
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 400


# Endpoint para obtener, actualizar o eliminar un producto por su ID
@api.route('/products/<int:product_id>', methods=['GET', 'PUT', 'DELETE'])
def manage_product(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404

    if request.method == 'GET':
        return jsonify(product.serialize()), 200

    elif request.method == 'PUT':
        try:
            data = request.json
            if 'cost' in data:
                product.cost = data['cost']
            if 'name' in data:
                product.name = data['name']
            if 'description' in data:
                product.description = data['description']
            if 'stars' in data:
                product.stars = data['stars']
            if 'img_url' in data:
                product.img_url = data['img_url']
            if 'category' in data:
                product.category = data['category']
            db.session.commit()
            return jsonify({"success": True, "message": "Product updated", "product": product.serialize()}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 400

    elif request.method == 'DELETE':
        try:
            db.session.delete(product)
            db.session.commit()
            return jsonify({"success": True, "message": "Product deleted"}), 200
        except Exception as e:
            return jsonify({"success": False, "message": str(e)}), 400

# -------------------------- FIN ENDPOINTS PRODUCTOS --------------------------
# -------------------------- ENDPOINTS ORDER ----------------------------------

  

# Ver producto individual
@api.route('/products/<int:product_id>', methods=['GET'])
def handle_get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if product is None:
        return jsonify({'error': 'Product not found'}), 404

    return jsonify(product.serialize()), 200


@api.route('/products', methods=['POST'])
def add_product():
    try:
        data = request.json  # Recibir los datos en formato JSON

        # Crear una nueva instancia de Product con los datos recibidos
        new_product = Product(
            cost=data['cost'],
            name=data['name'],
            description=data['description'],
            stars=data.get('stars', None),  # Si 'stars' no se encuentra, se asume None
            img_url=data['img_url'],
            category=data.get('category', None),  # Si 'category' no se encuentra, se asume None
            its_promo=data.get('its_promo', False)  # Si 'its_promo' no se encuentra, se asume False
        )

        # Añadir el nuevo producto a la base de datos
        db.session.add(new_product)
        db.session.commit()

        return jsonify({"success": True, "message": "Product added", "product": new_product.serialize()}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


#ENDPOINT PARA TRAER PROMOS DEL BACK
@app.route('/products', methods=['GET'])
def get_promo_products():
    # Consulta para encontrar todos los productos con "its_promo" como verdadero
    promo_products = Product.query.filter_by(its_promo=True).all()

    # Verificar si se encontraron productos en promoción
    if not promo_products:
        return jsonify({"error": "No se encontraron productos en promoción"}), 404

    # Serializar los productos y devolverlos como una lista de diccionarios
    return jsonify([product.serialize() for product in promo_products])





























































# -------------------------- FIN ENDPOINTS PRODUCTOS --------------------------
# -------------------------- ENDPOINTS ORDER ----------------------------------

@api.route('/orders', methods=['GET'])
def get_all_orders():
    try:
        # Busca todas las órdenes en la base de datos
        all_orders = Order.query.all()

        # Serializa cada orden a formato JSON
        serialized_orders = [order.serialize() for order in all_orders]

        return jsonify({"success": True, "orders": serialized_orders}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

@api.route('/user/<int:user_id>/orders', methods=['GET'])
def get_user_orders(user_id):
    try:
        # Buscar todas las órdenes para el user_id proporcionado
        user_orders = Order.query.filter_by(user_id=user_id).all()

        # Si no hay órdenes, devolver un mensaje indicándolo
        if not user_orders:
            return jsonify({"success": True, "message": "No orders found for this user.", "orders": []}), 200

        # Serializar las órdenes a formato JSON
        serialized_orders = [order.serialize() for order in user_orders]

        return jsonify({"success": True, "orders": serialized_orders}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400



@api.route('/user/<int:user_id>/add_order', methods=['POST'])
def add_order(user_id):
    try:
        data = request.json
        
        # Crear una nueva instancia de Order con la ID del usuario proporcionada
        new_order = Order(user_id=user_id)
        
        # Añadir los productos al pedido
        for item_data in data['items']:  # Cambio de 'order_products' a 'items' para alinearlo con tu JSON de entrada
            # Busca el producto en la base de datos
            product = Product.query.get(item_data['product_id'])
            if product is None:
                return jsonify({"success": False, "message": "Product not found"}), 400
            
            # Crea un nuevo OrderProduct y añádelo al pedido
            new_item = OrderProduct(
                product=product,
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                its_promo=item_data.get('its_promo', False)
            )
            new_order.items.append(new_item)
        
        # Calcular el costo total del pedido
        new_order.calculate_total_cost()
        
        # Añadir el nuevo pedido a la base de datos
        db.session.add(new_order)
        db.session.commit()
        
        return jsonify({"success": True, "message": "Order created", "order": new_order.serialize()}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400





app.register_blueprint(api, url_prefix='/api')

if __name__ == '__main__':
    app.run()