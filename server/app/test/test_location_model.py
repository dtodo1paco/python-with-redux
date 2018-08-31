import unittest

import datetime

from app.main import db
from app.main.location.models import Location
from app.test.base import BaseTestCase

class TestLocationModel(BaseTestCase):

    def test_add(self):
        loc = Location(
            id='testId',
            name='testLocation'
        )
        db.session.add(loc)
        db.session.commit()
        self.assertTrue(loc)

if __name__ == '__main__':
    unittest.main()

