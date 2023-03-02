from fastapi.testclient import TestClient
from main import app
from queries.swoop import SwoopsRepository
from authenticator import authenticator


client = TestClient(app)


class MockSwoopsQueries:
    def get_swooper_history(self, user_id):
        return [Swooper_history_mock]


Swooper_history_mock = {
    "user_id": 0,
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "email": "string",
    "address": "string",
    "car": "string",
    "license_number": "string",
    "username": "string",
    "hashed_password": "string",
    "is_swooper": True,
    "pickup_id": 0,
    "customer_id": 0,
    "swooper_id": 0,
    "trash_type": "string",
    "description": "string",
    "picture_url": "string",
    "hazards": "string",
    "size": "string",
    "weight": 0,
    "status": 0
}

mock_user = {
    "user_id": 0,
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "email": "string",
    "address": "string",
    "car": "string",
    "license_number": "string",
    "username": "string",
    "hashed_password": "string",
    "is_swooper": True
}


def account_override():
    return mock_user


def test_get_swooper_history_protected():

    app.dependency_overrides[SwoopsRepository] = MockSwoopsQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("/swoops")

    assert response.status_code == 200
    assert response.json() == [Swooper_history_mock]

    app.dependency_overrides = {}


def test_init():
    assert 1 == 1
