from flask_restplus import Namespace, fields

class PersonDto:
    api = Namespace('person', description='Person related operations')
    model_detail = api.model('person', {
        'id': fields.String(required=False, description='person id'),
        'name': fields.String(required=True, description='person name'),
        'surname': fields.String(required=True, description='person surname'),
        'birthday': fields.DateTime(dt_format='rfc822',required=False, description='the day when the person was born'),
        'father_id': fields.String(required=False, description='the persons father id'),
        'mother_id': fields.String(required=False, description='the persons mother id'),
        'location_id': fields.String(required=True, description='the location id')
    })
    model_create = api.model('person', {
        'name': fields.String(required=True, description='person name'),
        'surname': fields.String(required=True, description='person surname'),
        'birthday': fields.DateTime(dt_format='rfc822',required=False, description='the day when the person was born'),
        'father_id': fields.String(required=False, description='the persons father id'),
        'mother_id': fields.String(required=False, description='the persons mother id'),
        'location_id': fields.String(required=True, description='the location id')
    })
    model_list = api.model('person', {
        'name': fields.String(required=True, description='person name'),
        'surname': fields.String(required=True, description='person surname'),
        'birthday': fields.DateTime(required=False, description='the day when the person was born')
    })
    model_id = api.model('person_id', {
        'id': fields.String(required=False, description='person id')
    })