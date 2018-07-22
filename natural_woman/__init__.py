from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_migrate import Migrate
from flask_uploads import UploadSet, IMAGES, configure_uploads

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('flask.cfg')

db 		= SQLAlchemy(app)
bcrypt 	= Bcrypt(app)
mail 	= Mail(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "home"

images = UploadSet('images', IMAGES)
configure_uploads(app, images)

from . import views
from . import functions
from natural_woman.models import *

@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()