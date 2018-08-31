import datetime
import copy
import dateutil.parser
from sqlalchemy import or_
from flask import escape
from flask import json


from app.main import db
from .models import Person
from app.main.location.models import Location

def delete(data):
    try:
        if not 'id' in data:
            raise ValueError('Id must be supplied on delete op')
        valid_data = validate(data)
        item = Person.query.filter_by(id=data['id']).first()
        if not item:
            raise ValueError("error.item.not.found_" + data['id'])
        n_childen = Person.query.filter(or_(Person.father_id==data['id'], Person.mother_id==data['id'])).count()
        if n_childen > 0:
            raise ValueError("error.person.parent.of.children_" + str(n_childen))
        db.session.delete(item)
        db.session.commit()
    except ValueError as err:
        return {
            'status': 'error',
            'message': format(err)
        }, 409

def find_all():
    return Person.query.all()

def find_by_name(name):
    return Person.query.filter_by(name=name).first()

def create(data):
    if 'id' not in data:
        return save(data, True)
    return {
            'status': 'error',
            'message': 'Id must not be supplied on creation'
        }, 409

def update(data):
    if 'id' in data:
        return save(data, False)
    return {
            'status': 'error',
            'message': 'Id must be supplied on update'
        }, 409

def save(data, isNew):
    error=None
    response_code=201
    try:
        key = Person.build_key(data)
        if isNew:
            items_equal = Person.query.filter_by(key=key).count()
            if items_equal > 0:
                error='error.already.exists'
                response_code=409
            else:
                valid_data = validate(data)
                item = Person(
                    id=key,
                    key=key,
                    name=valid_data['name'],
                    surname=valid_data['surname'],
                    birthday=valid_data['birthday'],
                    location_id=valid_data['location_id'],
                    father_id=valid_data['father_id'],
                    mother_id=valid_data['mother_id']
                )
        else:
            valid_data = validate(data)
            item = Person.query.filter_by(id=valid_data['id']).first()
            if not item:
                error='No item found to update'
                response_code=404
            else:
                item.key=key
                item.name=valid_data['name']
                item.surname=valid_data['surname']
                item.birthday=valid_data['birthday']
                item.location_id=valid_data['location_id']
                item.father_id=valid_data['father_id']
                item.mother_id=valid_data['mother_id']
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

##
# Helpers
##

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def validate_parent(parent_id):
    secure_id = escape(parent_id)
    existing_parent = Person.query.filter_by(id=secure_id).first()
    if existing_parent:
        return existing_parent.id
    else:
        raise ValueError("Non existing parent with id: '" + secure_id + "'")

def validate(data):
    valid_data = copy.deepcopy(data)
    if 'father_id' in data:
        valid_data['father_id'] = validate_parent(data['father_id'])
    else:
        valid_data['father_id'] = None
    if 'mother_id' in data:
        valid_data['mother_id'] = validate_parent(data['mother_id'])
    else:
        valid_data['mother_id'] = None
    if 'location_id' in data:
        existing_loc = Location.query.filter_by(id=escape(data['location_id'])).first()
        if existing_loc:
            valid_data['location_id'] = existing_loc.id
        else:
            raise ValueError("Non existing location with id: '" + escape(data['location_id']) + "'")
    if 'birthday' in data:
        valid_data['birthday'] = dateutil.parser.parse(data['birthday'])
    else:
        valid_data['birthday'] = None
    if 'name' in data:
        valid_data['name'] = escape(data['name'])
    if 'surname' in data:
        valid_data['surname'] = escape(data['surname'])
    if 'id' in data:
        valid_data['id'] = escape(data['id'])
    else:
        valid_data['id'] = None
    return valid_data

