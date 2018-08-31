from flask_restplus import Namespace, fields

class Dto:
    api = Namespace('census', description='census related operations')
'''
    model_in = api.model('census', {
        'location_text': fields.String(required=False, description='location text'),
        'location_id': fields.String(required=False, description='location id')
    })
    model_out = api.model('census', {
        'population_by_location': fields.List(fields.Nested({
            'location_name': fields.String(required=True, description='location name'),
            'population': fields.Integer(required=True, description='population on location')
        }))
    })
'''