from flask_restplus import Api
from flask import Blueprint

from .main.location.controller import api as location_ns
from .main.person.controller import api as person_ns
from .main.census.controller import api as census_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='Simple REST backend',
          version='1.0',
          description='A simple REST server to support CRUD entity management'
          )

api.add_namespace(location_ns, path='/api/location')
api.add_namespace(person_ns, path='/api/person')
api.add_namespace(census_ns, path='/api/census')
