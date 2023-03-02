from fastapi.testclient import TestClient
from main import app
from queries.user import UserRepo
from authenticator import authenticator

client = TestClient(app)


class MockUsersQueries:
    def get_all_users(self):
        return [all_users_mock]


all_users_mock = {
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


def test_get_all_users():

    app.dependency_overrides[UserRepo] = MockUsersQueries
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = account_override

    response = client.get("/api/accounts/all")
    print(response)

    assert response.status_code == 200
    assert response.json() == [all_users_mock]

    app.dependency_overrides = {}
