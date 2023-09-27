"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Product, Order, OrderProduct, Extra  
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
 
@api.route('/users/<int:user_id>', methods=['PUT'])
@jwt_required()  # Omitir si no necesitas autenticación
def update_user(user_id):
    try:
        data = request.json
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404

        email = data.get('email')
        password = data.get('password')
        role = data.get('role')

        if email:
            user.email = email
        if password:
            user.password = password  # Asegúrate de hashear la contraseña antes de almacenarla
        if role:
            user.role = role

        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Usuario actualizado exitosamente'
        }), 200

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token, id=user.id, role=user.role), 200  # Incluye role aquí
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

# Endpoint para obtener todos los productos
@api.route('/products', methods=['GET'])
def get_all_products():
    try:
        products_query = Product.query.all()
        products_list = [product.serialize() for product in products_query]
        return jsonify(products_list), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


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
        new_product = Product(
            cost=data['cost'],
            name=data['name'],
            description=data['description'],
            stars=data.get('stars', None), 
            img_url=data['img_url'],
            category=data.get('category', None),  
            its_promo= data.get('promo', False),
            its_daily_menu= data.get('daily_menu', False)
        )
        print(new_product)
        db.session.add(new_product)
        db.session.commit()
        print("Producto agregado exitosamente:", new_product.serialize())  
        return jsonify({"success": True, "message": "Product added", "product": new_product.serialize()}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# Endpoint para borrar un producto existente por su ID
@api.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        product = Product.query.get(product_id)
        if product is None:
            return jsonify({'error': 'Producto no encontrado'}), 404

        db.session.delete(product)
        db.session.commit()

        return jsonify({"success": True, "message": "Producto eliminado exitosamente"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400


# Endpoint para actualizar un producto existente por su ID
@api.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        product = Product.query.get(product_id)
        if product is None:
            return jsonify({'error': 'Producto no encontrado'}), 404
        
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
        if 'promo' in data:
            product.its_promo = data['promo']        
        
        db.session.commit()
        return jsonify({"success": True, "message": "Producto actualizado exitosamente", "product": product.serialize()}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# ENDPOINT PARA TRAER MENÚ DEL DÍA DEL BACK
@api.route('/daily_menu', methods=['GET'])
def get_daily_menu():
    # Consulta para encontrar todos los productos con "its_daily_menu" como verdadero
    daily_menu_products = Product.query.filter_by(its_daily_menu=True).all()

    # Verificar si se encontraron productos para el menú del día
    if not daily_menu_products:
        return jsonify({"error": "No se encontraron productos para el menú del día"}), 404

    # Serializar los productos y devolverlos como una lista de diccionarios
    return jsonify([product.serialize() for product in daily_menu_products])

# Endpoint para actualizar el menú del día por su ID
@api.route('/daily_menu/<int:product_id>', methods=['PUT'])
def put_daily_menu(product_id):
    try:
        # Obtener el producto por su ID
        product = Product.query.get(product_id)
        if product is None:
            return jsonify({'error': 'Producto no encontrado'}), 404

        # Establecer todos los productos con "its_daily_menu" como falso
        all_products = Product.query.all()
        for p in all_products:
            p.its_daily_menu = False

        # Establecer el producto seleccionado como el menú del día
        product.its_daily_menu = True

        # Guardar los cambios en la base de datos
        db.session.commit()

        return jsonify({"success": True, "message": "Menú del día actualizado exitosamente", "daily_menu": product.serialize()}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# -------------------------- FIN ENDPOINTS PRODUCTOS --------------------------
# -------------------------- ENDPOINTS ORDER ----------------------------------

# ENDPOINT PARA TRAER TODOS LOS EXTRAS
@api.route('/extras', methods=['GET'])
def get_all_extras():
    extras = Extra.query.all()
    if not extras:
        return jsonify({"error": "No se encontraron extras"}), 404
    return jsonify([extra.serialize() for extra in extras]), 200

# ENDPOINT PARA TRAER UN EXTRA ESPECÍFICO
@api.route('/extras/<int:extra_id>', methods=['GET'])
def get_single_extra(extra_id):
    extra = Extra.query.get(extra_id)
    if not extra:
        return jsonify({"error": "Extra no encontrado"}), 404
    return jsonify(extra.serialize()), 200

# ENDPOINT PARA CREAR UN NUEVO EXTRA
@api.route('/extras', methods=['POST'])
def create_extra():
    data = request.json
    new_extra = Extra(
        name=data.get('name'),
        price=data.get('price'),
        type=data.get('type'),
        categories=data.get('categories')
    )
    db.session.add(new_extra)
    db.session.commit()
    return jsonify(new_extra.serialize()), 201

# ENDPOINT PARA ACTUALIZAR UN EXTRA EXISTENTE
@api.route('/extras/<int:extra_id>', methods=['PUT'])
def update_extra(extra_id):
    data = request.json
    extra = Extra.query.get(extra_id)
    if not extra:
        return jsonify({"error": "Extra no encontrado"}), 404
    extra.name = data.get('name', extra.name)
    extra.price = data.get('price', extra.price)
    extra.type = data.get('type', extra.type)
    extra.categories = data.get('categories', extra.categories)
    db.session.commit()
    return jsonify(extra.serialize()), 200

# ENDPOINT PARA ELIMINAR UN EXTRA
@api.route('/extras/<int:extra_id>', methods=['DELETE'])
def delete_extra(extra_id):
    extra = Extra.query.get(extra_id)
    if not extra:
        return jsonify({"error": "Extra no encontrado"}), 404
    db.session.delete(extra)
    db.session.commit()
    return jsonify({"message": "Extra eliminado con éxito"}), 200




























































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
        for item_data in data['items']:
            # Busca el producto en la base de datos
            product = Product.query.get(item_data['product_id'])
            if product is None:
                return jsonify({"success": False, "message": "Product not found"}), 400
            
            # Busca los extras y los valida
            extras_objects = []
            for extra_data in item_data['extras']:
                extra = Extra.query.get(extra_data['id'])
                if not extra:
                    return jsonify({"success": False, "message": f"Extra with id {extra_data['id']} not found"}), 400
                extras_objects.append(extra)
            
            # Crea un nuevo OrderProduct y añádelo al pedido
            new_item = OrderProduct(
                product=product,
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                extras=extras_objects  # Ahora es una lista de objetos Extra
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