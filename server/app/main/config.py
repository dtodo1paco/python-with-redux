import os

##
# READ ENVIRONMENT
##
local_base = None
local_port = 5000
create_db = False
if "DATABASE_URL" in os.environ:
    local_base = os.environ['DATABASE_URL']
if "PORT" in os.environ:
    local_port = os.environ['PORT']
if "CREATE_DB" in os.environ:
    create_db = os.environ['CREATE_DB']

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False

class DevelopmentConfig(Config):
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dev.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    STATIC_FOLDER = '../../static'
    PORT = local_port
    CRAETE_DB = create_db


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'test.db')
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    print ("connecting to " + str(local_base))
    SQLALCHEMY_DATABASE_URI = local_base
    PORT=local_port
    CRAETE_DB = create_db


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
