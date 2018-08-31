from app.main import db

class JsonModel(object):
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Location(db.Model, JsonModel):
    """ Location Model for storing user related details """
    __tablename__ = 'location'
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(50), unique=False)
#    persons = db.relationship('Person', backref='person', lazy=True)


    def __repr__(self):
        return self.name
