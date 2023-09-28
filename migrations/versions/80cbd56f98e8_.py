"""empty message

<<<<<<<< HEAD:migrations/versions/00aa23865535_.py
Revision ID: 00aa23865535
Revises: 
Create Date: 2023-09-26 20:38:42.977203
========
Revision ID: 80cbd56f98e8
Revises: 
Create Date: 2023-09-27 12:57:44.752164
>>>>>>>> 5ceef32bf2748ba028ec2dd0fa32581f91070957:migrations/versions/80cbd56f98e8_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/00aa23865535_.py
revision = '00aa23865535'
========
revision = '80cbd56f98e8'
>>>>>>>> 5ceef32bf2748ba028ec2dd0fa32581f91070957:migrations/versions/80cbd56f98e8_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('extra',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('type', sa.String(length=40), nullable=True),
    sa.Column('categories', sa.JSON(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cost', sa.Float(), nullable=False),
    sa.Column('name', sa.String(length=40), nullable=False),
    sa.Column('description', sa.String(length=120), nullable=False),
    sa.Column('stars', sa.Integer(), nullable=True),
    sa.Column('img_url', sa.String(length=500), nullable=False),
    sa.Column('category', sa.String(length=40), nullable=True),
    sa.Column('its_promo', sa.Boolean(), nullable=False),
    sa.Column('its_daily_menu', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('total_cost', sa.Float(), nullable=True),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('cost', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['product.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_product_extras',
    sa.Column('order_product_id', sa.Integer(), nullable=False),
    sa.Column('extra_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['extra_id'], ['extra.id'], ),
    sa.ForeignKeyConstraint(['order_product_id'], ['order_product.id'], ),
    sa.PrimaryKeyConstraint('order_product_id', 'extra_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_product_extras')
    op.drop_table('order_product')
    op.drop_table('order')
    op.drop_table('user')
    op.drop_table('product')
    op.drop_table('extra')
    # ### end Alembic commands ###
