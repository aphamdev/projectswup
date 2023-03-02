from fastapi.testclient import TestClient

from main import app
from queries.swoop import SwoopsRepository
from queries.user import UserRepo
from authenticator import authenticator


client = TestClient(app)

class EmptyPostQueries:
    def get_all_customer_posts(self, user_id):
        return []


customerpost_mock = {
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

def test_get_all_customer_posts_protected():


    app.dependency_overrides[SwoopsRepository] = EmptyPostQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("/pickups")


    assert response.status_code == 200
    assert response.json() == [customerpost_mock]

    app.dependency_overrides = {}

def test_init():
    assert 1 == 1
