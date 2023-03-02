from fastapi.testclient import TestClient
from main import app
from queries.swoop import SwoopsRepository

# This gives an instance of our app to mock the HTTP requests
client = TestClient(app)


class MockSwoopsRepository:
    def get_all_available(self):
        return [mock_available_swoops]


mock_available_swoops = {
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
    "pickup_id": 1,
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


def test_get_all_available():

    # Arrange
    app.dependency_overrides[SwoopsRepository] = MockSwoopsRepository

    response = client.get("/listings")

    # Act

    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == [mock_available_swoops]
