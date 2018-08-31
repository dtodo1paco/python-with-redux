from flask import request
from flask_restplus import Resource

from .dto import LocationDto

from .services import create, update, delete, find_all, find_by_name

api = LocationDto.api
_model_name = LocationDto.model_name
_model_full = LocationDto.model_full
_model_id = LocationDto.model_id

@api.route('/all')
class LocationOps(Resource):
    @api.doc('list_of_registered_locations')
    @api.marshal_list_with(_model_full, envelope='data')
    def get(self):
        """List all registered locations"""
        return find_all()


@api.route('/')
class LocationOps(Resource):
    @api.doc('list_of_registered_locations')
    @api.marshal_list_with(_model_name, envelope='data')
    def get(self):
        """List all registered locations"""
        return find_all()

    @api.expect(_model_name, validate=True)
    @api.response(201, 'Location successfully created.')
    @api.doc('creates a new location')
    def post(self):
        """Creates a new Location """
        data = request.json
        return create(data=data)

    @api.expect(_model_name, validate=True)
    @api.response(201, 'Location successfully updated.')
    @api.doc('Updates an existing Location')
    def put(self):
        """Updates an existing Location"""
        data = request.json
        return update(data=data)

    @api.expect(_model_id, validate=True)
    @api.response(201, 'Location successfully deleted.')
    @api.doc('Deletes an existing Location')
    def delete(self):
        """Deletes an existing Location """
        data = request.json
        return delete(data=data)