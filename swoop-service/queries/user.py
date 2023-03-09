from pydantic import BaseModel
from queries.pool import pool
from typing import Optional, List


class DuplicateAccountError(ValueError):
    pass


class UsersIn(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: str
    address: str
    password: str
    username: str


class UsersOut(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    phone_number: str
    email: str
    address: str
    car: Optional[str]
    license_number: Optional[str]
    username: str
    hashed_password: str
    is_swooper: Optional[bool]


class UsersProfileUpdate(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    phone_number: Optional[str]
    email: Optional[str]
    address: Optional[str]
    car: Optional[str]
    license_number: Optional[str]
    username: Optional[str]


class UsersOutWithPassword(UsersOut):
    hashed_password: str


class UserUpdate(BaseModel):
    car: str
    license_number: str


class UserDelete(BaseModel):
    deleted: bool


class UserRepo:
    def delete(self, account_data: dict) -> UserDelete:
        print(account_data)
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE user_id = %s;
                    """,
                    [account_data["user_id"]]
                )
                user = UserDelete(
                    deleted=True
                )
                return user

    def create(self, users: UsersIn,
               hashed_password: str) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                            (first_name,
                            last_name,
                            phone_number,
                            email,
                            address,
                            username,
                            hashed_password)
                        VALUES
                            (%s,%s,%s,%s,%s,%s,%s)
                        RETURNING user_id;
                        """,
                        [
                            users.first_name,
                            users.last_name,
                            users.phone_number,
                            users.email,
                            users.address,
                            users.username,
                            hashed_password
                        ]
                    )
                    user_id = result.fetchone()[0]
                    old_data = users.dict()
                    return UsersOutWithPassword(
                        user_id=user_id,
                        **old_data,
                        hashed_password=hashed_password
                    )

        except Exception as e:
            if 'email' in str(e):
                raise ValueError('Email already exists')
            elif 'phone_number' in str(e):
                raise ValueError('Phone number already exists')
            elif 'username' in str(e):
                raise DuplicateAccountError('Username already exists')
            else:
                raise

    def get(self, email: str) -> UsersOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT user_id,
                                first_name,
                                last_name,
                                phone_number,
                                email, address,
                                car,
                                license_number,
                                is_swooper,
                                hashed_password,
                                username
                        FROM users
                        WHERE email = %s
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    user = UsersOut(
                        user_id=record[0],
                        first_name=record[1],
                        last_name=record[2],
                        phone_number=record[3],
                        email=record[4],
                        address=record[5],
                        car=record[6],
                        license_number=record[7],
                        is_swooper=record[8],
                        hashed_password=record[9],
                        username=record[10]
                    )
                    return user
        except Exception as e:
            print(e)
            return {"message": "doesnt work oops"}

    def update(self, user_id: int, users: UserUpdate) -> UsersOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET car = %s
                            , license_number = %s
                            , is_swooper = true
                        WHERE user_id = %s
                        """,
                        [
                            users.car,
                            users.license_number,
                            user_id
                        ]
                    )
                    old_data = users.dict()
                    return UserUpdate(**old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update user information"}

    def update_profile(self,
                       user_id: int,
                       users: UsersProfileUpdate) -> UsersOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET first_name = %s,
                            last_name = %s,
                            phone_number = %s,
                            email = %s, address = %s,
                            username = %s, car = %s,
                            license_number = %s
                        WHERE user_id = %s
                        """,
                        [
                            users.first_name,
                            users.last_name,
                            users.phone_number,
                            users.email,
                            users.address,
                            users.username,
                            users.car,
                            users.license_number,
                            user_id
                        ]
                    )
                    old_data = users.dict()
                    return UsersProfileUpdate(**old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not update user information"}

    def get_all_users(self) -> List[UsersOutWithPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        '''
                        SELECT user_id,
                                first_name,
                                last_name,
                                phone_number,
                                email,
                                address,
                                car,
                                license_number,
                                is_swooper,
                                hashed_password,
                                username
                        FROM users
                        ORDER BY user_id
                        '''
                    )
                    result = []
                    for record in db:
                        users = UsersOutWithPassword(
                            user_id=record[0],
                            first_name=record[1],
                            last_name=record[2],
                            phone_number=record[3],
                            email=record[4],
                            address=record[5],
                            car=record[6],
                            license_number=record[7],
                            is_swooper=record[8],
                            hashed_password=record[9],
                            username=record[10]
                        )
                        result.append(users)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all users"}
