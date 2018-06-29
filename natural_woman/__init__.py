from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('flask.cfg')

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

from . import views
from . import functions
from natural_woman.models import *

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()