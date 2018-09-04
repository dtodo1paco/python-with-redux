import hashlib
import json

from app.main import db
from app.main.location.models import Location
class JsonModel(object):
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Person(db.Model, JsonModel):
    """ Person Model for storing user related details """
    __tablename__ = 'person'
    id = db.Column(db.String, primary_key=True, nullable=False)
    key = db.Column(db.String, primary_key=False, nullable=False)
    name = db.Column(db.String(50), unique=False, nullable=False)
    surname = db.Column(db.String(150), unique=False, nullable=False)
    birthday = db.Column(db.DateTime, unique=False, nullable=True)
    location_id = db.Column(db.String, db.ForeignKey(Location.id), nullable=False)
    father_id = db.Column(db.String, db.ForeignKey(__tablename__+'.id'), index=True)
    father = db.relationship('Person',
        remote_side="Person.id", primaryjoin=('person.c.id==person.c.father_id'),
        backref="backref('children_of_father')", uselist=False)

    # father = db.relation("Person", remote_side="Person.id")
    mother_id = db.Column(db.String, db.ForeignKey(__tablename__+'.id'), index=True)
    mother = db.relationship('Person',
        remote_side="Person.id", primaryjoin=('person.c.id==person.c.mother_id'),
        backref="backref('children_of_mother')", uselist=False)

    def __repr__(self):
        return self.name

    def build_key(data):
        return hashlib.sha1(json.dumps(data, sort_keys=True).encode('utf-8')).hexdigest()
