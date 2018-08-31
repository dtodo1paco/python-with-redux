from flask_restplus import Namespace, fields

class LocationDto:
    api = Namespace('location', description='location related operations')
    model_name = api.model('location', {
        'name': fields.String(required=True, description='location name')
    })
    model_full = api.model('location', {
        'id': fields.String(required=True, description='location id'),
        'name': fields.String(required=True, description='location name')
    })
    model_id = api.model('location_id', {
        'id': fields.String(required=False, description='location id')
    })