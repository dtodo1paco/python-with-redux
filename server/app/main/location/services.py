import uuid
import datetime
import copy
from flask import escape
from flask import json


from app.main import db
from .models import Location
from app.main.person.models import Person


def create(data):
    if 'id' in data:
        return {
                'status': 'error',
                'message': 'error.id.must.not.be.present'
            }, 409
    location = Location.query.filter_by(name=data['name']).first()
    if not location:
        return save(data, True)
    else:
        return {
                'status': 'error',
                'message': 'error.already.exists'
            }, 409

def update(data):
    if 'id' in data:
        return save(data, False)
    return {
            'status': 'error',
            'message': 'error.required.id.not.found'
        }, 409

def save(data, isNew):
    error=None
    response_code=201
    try:
        valid_data = validate(data)
        if isNew:
                item = Location(
                    id=str(uuid.uuid4()),
                    name=valid_data['name']
                )
        else:
            item = Location.query.filter_by(id=valid_data['id']).first()
            if not item:
                error='error.item.not.found'
                response_code=404
            else:
                valid_data = validate(data)
                item.name=valid_data['name']
    except ValueError as err:
        print("Validation error: ", format(err))
        error = format(err)

    if not error:
        save_changes(item)
        response_object = {
            'status': 'success',
            'message': 'Successfully saved.',
            'data': json.dumps(item.as_dict())
        }
    else:
        response_object = {
            'status': 'error',
            'message': error
        }
    return response_object, response_code

def delete(data):
    try:
        if not 'id' in data:
            raise ValueError('Id must be supplied on delete op')
        valid_data = validate(data)
        item = Location.query.filter_by(id=valid_data['id']).first()
        if not item:
            raise ValueError("error.item.not.found_'" + valid_data['id'] + "'")
        n_persons = Person.query.filter_by(location_id=data['id']).count()
        if n_persons > 0:
            raise ValueError("error.location.parent.of.children_" + str(n_persons))

        db.session.delete(item)
        db.session.commit()
    except ValueError as err:
        return {
            'status': 'error',
            'message': format(err)
        }, 409

def find_all():
    return Location.query.all()

def find_by_name(name):
    return Location.query.filter_by(name=name).first()

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def validate(data):
    valid_data = copy.deepcopy(data)
    if 'name' in data:
        valid_data['name'] = escape(data['name'])
    return valid_data