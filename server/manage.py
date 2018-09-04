import os
import unittest

from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from flask import send_file

from app import blueprint
from app.main import setup_app, db

env = os.getenv('BACKEND_ENV') or 'dev'
app = setup_app(env)
app.register_blueprint(blueprint)

app.app_context().push()
if env == "dev":
    db.create_all() # I DO create everything

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    res = path
    if len(path) < 2:
        res = 'index.html'
    return send_file('../../static/'+res)

manager = Manager(app)

migrate = Migrate(app, db)

manager.add_command('db', MigrateCommand)

@manager.command
def run():
    app.run(host='0.0.0.0', port=int(app.config['PORT']))

@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()
