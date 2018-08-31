import unittest

from app.main import db
import json
from app.test.base import BaseTestCase


def register_location(self):
    return self.client.post(
        '/api/location/',
        data=json.dumps(dict(
            name='testLocation'
        )),
        content_type='application/json'
    )

class TestLocationBlueprint(BaseTestCase):
    def test_registration(self):
        """ Test for location creation """
        with self.client:
            response = register_location(self)
            data = json.loads(response.data.decode())
            d = json.loads(data['data']);
            self.assertTrue(d['name'] == 'testLocation')
            self.assertTrue(data['message'] == 'Successfully saved.')
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 201)

    def test_registered_with_already_registered_location(self):
        """ Test registration with already registered name"""
        register_location(self)
        with self.client:
            response = register_location(self)
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'error')
            self.assertTrue(
                data['message'] == 'error.already.exists')
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 409)


if __name__ == '__main__':
    unittest.main()
