from fastapi.testclient import TestClient
from main import app
from fastapi import Depends
from queries.swoop import SwoopsRepository
from authenticator import authenticator


client = TestClient(app)


class CreateSwoopsRepository:
    def create(self, swoop, user_id):
        result = {
            "customer_id": 1,
            "trash_type": "string",
            "description": "string",
            "picture_url": "string",
            "hazards": "string",
            "size": "string",
            "weight": 100
        }
        result.update(swoop)
        return result


mock_user = {
        "user_id": 1,
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "email": "string",
        "address": "string",
        "car": "string",
        "license_number": "string",
        "username": "string",
        "hashed_password": "string",
        "is_swooper": False
    }


def account_override():
    return mock_user


def test_create_pickup():
    # Arrange
    app.dependency_overrides[SwoopsRepository] = CreateSwoopsRepository
    app.dependency_overrides[authenticator.try_get_current_account_data] = account_override

    json = {
        "customer_id": 1,
        "trash_type": "string",
        "description": "string",
        "picture_url": "string",
        "hazards": "string",
        "size": "string",
        "weight": 0
    }

    expected = {
        "customer_id": 1,
        "trash_type": "string",
        "description": "string",
        "picture_url": "string",
        "hazards": "string",
        "size": "string",
        "weight": 0
    }

    response = client.post("/pickups", json=json)
    assert response.status_code == 200
    assert response.json() == expected
    app.dependency_overrides = {}
