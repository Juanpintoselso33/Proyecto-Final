from flask_admin import Admin
from flask_admin.form import rules
from flask_admin.contrib.sqla.fields import InlineModelFormList
from flask_admin.contrib.sqla import ModelView
from flask import Markup
from .models import db, User, Product, Order, OrderProduct


class OrderProductView(ModelView):
    column_list = ('id', 'product_id', 'order_id', 'quantity', 'cost')  # Agregamos 'cost' aquí
    form_excluded_columns = ['order']


class OrderView(ModelView):
    form_excluded_columns = ['total_cost']
    column_list = ('id', 'total_cost', 'timestamp', 'items', 'user')

    def _list_items(view, context, model, name):
        if not model.items:
            return ""
        
        item_strings = []
        for item in model.items:
            product = Product.query.get(item.product_id)
            item_strings.append(f"{product.name} (Cantidad: {item.quantity})")
        
        return Markup("<br>".join(item_strings))

    column_formatters = {
        'items': _list_items
    }

    def on_model_change(self, form, model, is_created):
        model.calculate_total_cost()
        db.session.commit()

        if is_created:
            for item in model.items:
                item.order_id = model.id
            db.session.commit()

class UserView(ModelView):
    column_list = ('id', 'email','is_active', 'role')  # Agregamos 'role' aquí
    form_excluded_columns = ['order_products', 'orders']

class ProductView(ModelView):
    column_list = ('id', 'cost', 'name', 'description', 'stars', 'img_url')
    form_excluded_columns = ['order_products']
    
def setup_admin(app):    
    admin = Admin(app, name='Admin', template_mode='bootstrap3')
    
    admin.add_view(UserView(User, db.session))
    admin.add_view(ProductView(Product, db.session))
    admin.add_view(OrderProductView(OrderProduct, db.session))
    admin.add_view(OrderView(Order, db.session))