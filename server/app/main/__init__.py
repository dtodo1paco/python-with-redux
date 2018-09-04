from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from .config import config_by_name

db = SQLAlchemy()
flask_bcrypt = Bcrypt()

def setup_app(config_name):
    app = Flask(__name__, static_url_path='/', static_folder='../../static/', template_folder='../../static')
    print ("setup app with env:",config_name)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    flask_bcrypt.init_app(app)
    return app
