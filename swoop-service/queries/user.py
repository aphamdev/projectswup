from pydantic import BaseModel
from queries.pool import pool
from typing import Optional

class UsersIn(BaseModel):
    first_name: str
    last_name: str
    phone_number: int
    email: str
    address: str
    password: str
    username: str
    is_swooper: bool

class UsersOut(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    phone_number: int
    email: str
    address: str
    car: Optional[str]
    license_number: Optional[str]
    is_swooper: bool
    password: str
    username: str


class UserRepo:
    def create(self, users: UsersIn) -> UsersOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO users
                        (
                            first_name, last_name, phone_number, email, address, password, username, is_swooper
                        )
                    VALUES
                        (%s,%s,%s,%s,%s,%s,%s,%s)
                    RETURNING user_id;
                    """,
                    [
                        users.first_name, users.last_name, users.phone_number,
                        users.email, users.address, users.password, users.username, users.is_swooper
                    ]
                )
                user_id = result.fetchone()[0]
                old_data = users.dict()
                return UsersOut(user_id=user_id, **old_data)
