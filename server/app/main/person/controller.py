from flask import request
from flask_restplus import Resource

from .dto import PersonDto

from .services import create, update, delete, find_all, find_by_name

api = PersonDto.api
_model_create = PersonDto.model_create
_model_detail = PersonDto.model_detail
_model_list = PersonDto.model_list
_model_id = PersonDto.model_id

@api.route('/all')
class PersonOps(Resource):
    @api.doc('List of registered Persons')
    @api.marshal_list_with(_model_detail, envelope='data')
    def get(self):
        """List all registered Persons"""
        return find_all()

@api.route('/')
class PersonOps(Resource):
    @api.doc('List of registered Persons')
    @api.marshal_list_with(_model_list, envelope='data')
    def get(self):
        """List all registered Persons"""
        return find_all()

    @api.expect(_model_create, validate=True)
    @api.response(201, 'Person successfully created.')
    @api.doc('create a new Person')
    def post(self):
        """Creates a new Person """
        data = request.json
        return create(data=data)

    @api.expect(_model_detail, validate=True)
    @api.response(201, 'Person successfully updated.')
    @api.doc('Updates an existing Person')
    def put(self):
        """Updates an existing Person """
        data = request.json
        return update(data=data)

    @api.expect(_model_id, validate=True)
    @api.response(201, 'Person successfully deleted.')
    @api.doc('Deletes an existing Person')
    def delete(self):
        """Deletes an existing Person """
        data = request.json
        return delete(data=data)