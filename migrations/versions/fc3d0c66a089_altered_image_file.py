"""Altered image file

Revision ID: fc3d0c66a089
Revises: 6fb4a903761b
Create Date: 2018-07-24 02:12:37.283792

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fc3d0c66a089'
down_revision = '6fb4a903761b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('authorization')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('authorization',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('name', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('email', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('admin_access', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('product_access', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('about_access', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('blog_access', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('gallery_access', sa.BOOLEAN(), autoincrement=False, nullable=True),
    sa.Column('auth_code', sa.VARCHAR(length=10), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='authorization_pkey'),
    sa.UniqueConstraint('email', name='authorization_email_key')
    )
    # ### end Alembic commands ###
