from pydantic import BaseModel
from typing import Optional, List, Union
from fastapi.security import OAuth2PasswordBearer
from queries.user import UsersIn, UsersOut
from queries.pool import pool
from fastapi import APIRouter, Depends


class Error(BaseModel):
    message: str


class SwoopsIn(BaseModel):
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: str
    weight: int


class SwoopsOut(BaseModel):
    pickup_id: int
    customer_id: Optional[int]
    swooper_id: Optional[int]
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: str
    weight: int
    status: int

class SwoopsAccept(BaseModel):
    pickup_id: int
    status: int
    swooper_id: int

class SwoopsOutWithUsers(UsersOut):
    pickup_id: int
    customer_id: Optional[int]
    swooper_id: Optional[int]
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: str
    weight: int
    status: int
    user_id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    phone_number: Optional[str]
    email: Optional[str]
    address: Optional[str]
    car: Optional[str]
    license_number: Optional[str]
    username: Optional[str]
    hashed_password: Optional[str]
    is_swooper: Optional[bool]


class SwoopsRepository:

    # def get_one_swoop(self, pickup_id: int, user_id) -> Optional[SwoopsOut]:
    # # connect to the database
    #     print(pickup_id)
    #     try:
    #         with pool.connection() as conn:
    #             # get a cursor (something to run SQL with which is PG-admin in our case)
    #             with conn.cursor() as db:
    #                 # execute the SELECT statement
    #                 db.execute(
    #                     """
    #                     SELECT pickup_id, customer_id, swooper_id, trash_type, description, picture_url, hazards, size, weight, status
    #                     FROM swoops
    #                     WHERE pickup_id = %s AND swooper_id = %s
    #                     """,
    #                     [pickup_id, user_id]
    #                 )
    #                 # process the query result
    #                 record = db.fetchone()
    #                 print(record)
    #                 if record is not None:
    #                     swoop = SwoopsOut(
    #                         pickup_id=record[0],
    #                         customer_id=record[1],
    #                         swooper_id=record[2],
    #                         trash_type=record[3],
    #                         description=record[4],
    #                         picture_url=record[5],
    #                         hazards=record[6],
    #                         size=record[7],
    #                         weight=record[8],
    #                         status=record[9]
    #                     )
    #                     return swoop
    #                 else:
    #                     return None

    #     except Exception as e:
    #         print(e)
    #         return {"message": "Could not get that swoop"}

    def get_one_swoop(self, pickup_id: int, user_id: int) -> Optional[SwoopsOutWithUsers]:
    # connect to the database
        try:
            with pool.connection() as conn:
                # get a cursor to execute SQL queries
                with conn.cursor() as db:
                    # execute the SELECT statement with JOIN
                    db.execute(
                        """
                        SELECT s.pickup_id, s.customer_id, s.swooper_id, s.trash_type, s.description, s.picture_url, s.hazards, s.size, s.weight, s.status,
                        u.first_name, u.last_name, u.phone_number, u.email, u.address, u.hashed_password, u.username, u.car, u.license_number, u.is_swooper, u.user_id
                        FROM swoops s
                        INNER JOIN users u
                        ON s.customer_id = u.user_id
                        WHERE s.pickup_id = %s AND s.swooper_id = %s
                        """,
                        [pickup_id, user_id]
                    )
                    # process the query result
                    record = db.fetchone()
                    print(record)
                    if record is not None:
                        # extract columns from both tables
                        swoop = SwoopsOutWithUsers(
                            pickup_id=record[0],
                            customer_id=record[1],
                            swooper_id=record[2],
                            trash_type=record[3],
                            description=record[4],
                            picture_url=record[5],
                            hazards=record[6],
                            size=record[7],
                            weight=record[8],
                            status=record[9],
                            first_name=record[10],
                            last_name=record[11],
                            phone_number=record[12],
                            email=record[13],
                            address=record[14],
                            hashed_password=record[15],
                            username=record[16],
                            car=record[17],
                            license_number=record[18],
                            is_swooper=record[19]
                        )
                        return swoop
                    else:
                        return None
        except Exception as e:
            print(str(e))
            return None

    def get_swooper_history(self, user_id) -> Union[Error,List[SwoopsOutWithUsers]]:
        # connect to the database
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with which is PG-admin in our case)
                with conn.cursor() as db:
                    # execute the SELECT statement
                    db.execute(
                        """
                        SELECT s.pickup_id, s.customer_id, s.swooper_id, s.trash_type, s.description, s.picture_url, s.hazards, s.size, s.weight, s.status,
                        u.first_name, u.last_name, u.phone_number, u.email, u.address, u.hashed_password, u.username, u.car, u.license_number, u.is_swooper, u.user_id
                        FROM swoops s
                        INNER JOIN users u
                        ON s.customer_id = u.user_id
                        WHERE swooper_id = %s
                        ORDER BY status
                        """,
                        [user_id]
                    )
                    # process the query result
                    result = []
                    for record in db:
                        swoop = SwoopsOutWithUsers(
                            pickup_id=record[0],
                            customer_id=record[1],
                            swooper_id=record[2],
                            trash_type=record[3],
                            description=record[4],
                            picture_url=record[5],
                            hazards=record[6],
                            size=record[7],
                            weight=record[8],
                            status=record[9],
                            first_name=record[10],
                            last_name=record[11],
                            phone_number=record[12],
                            email=record[13],
                            address=record[14],
                            hashed_password=record[15],
                            username=record[16],
                            car=record[17],
                            license_number=record[18],
                            is_swooper=record[19]
                        )
                        result.append(swoop)

                    return result

        except Exception as e:
            print(e)
            return e
            # return {"message": "Could not get list of swoops"}

    def create(self, pickup: SwoopsIn, account_data: dict) -> SwoopsOut:
        # Connect the database
        with pool.connection() as conn:
            # Get a cursor (something to run SQL with)
            with conn.cursor() as db:
                # Run our INSERT statement
                result = db.execute(
                    """
                    INSERT INTO swoops
                        (customer_id, trash_type, description, picture_url, hazards, size, weight)
                    VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING pickup_id;
                    """,
                    [
                        account_data["user_id"],
                        pickup.trash_type,
                        pickup.description,
                        pickup.picture_url,
                        pickup.hazards,
                        pickup.size,
                        pickup.weight,

                    ]
                )
                pickup_id = result.fetchone()[0]
                # Return new data
                old_data = pickup.dict()
                return SwoopsOut(
                    pickup_id=pickup_id,
                    **old_data,
                    customer_id=account_data["user_id"],
                    status=0
                )

    def get_all_available(self) -> Union[Error, List[SwoopsOutWithUsers]]:
        try:
            with pool.connection() as conn:
                # get a cursor to execute SQL queries
                with conn.cursor() as db:
                    # execute the SELECT statement with JOIN
                    db.execute(
                        """
                        SELECT s.pickup_id, s.customer_id, s.swooper_id, s.trash_type, s.description, s.picture_url, s.hazards, s.size, s.weight, s.status,
                        u.first_name, u.last_name, u.phone_number, u.email, u.address, u.hashed_password, u.username, u.car, u.license_number, u.is_swooper, u.user_id
                        FROM swoops s
                        INNER JOIN users u
                        ON s.customer_id = u.user_id
                        WHERE status = 0
                        ORDER BY pickup_id
                        """,
                    )
                    # process the query result
                    result = []
                    for record in db:
                        # extract columns from both tables
                        swoop = SwoopsOutWithUsers(
                            pickup_id=record[0],
                            customer_id=record[1],
                            swooper_id=record[2],
                            trash_type=record[3],
                            description=record[4],
                            picture_url=record[5],
                            hazards=record[6],
                            size=record[7],
                            weight=record[8],
                            status=record[9],
                            first_name=record[10],
                            last_name=record[11],
                            phone_number=record[12],
                            email=record[13],
                            address=record[14],
                            hashed_password=record[15],
                            username=record[16],
                            car=record[17],
                            license_number=record[18],
                            is_swooper=record[19]
                        )
                        result.append(swoop)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all available swoops"}



    def get_all_customer_posts(self, user_id) -> Union[Error,List[SwoopsOutWithUsers]]:
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with which is PG-admin in our case)
                with conn.cursor() as db:
                    # execute the SELECT statement
                    db.execute(
                        """
                        SELECT s.pickup_id, s.customer_id, s.swooper_id, s.trash_type, s.description, s.picture_url, s.hazards, s.size, s.weight, s.status,
                        u.first_name, u.last_name, u.phone_number, u.email, u.address, u.hashed_password, u.username, u.car, u.license_number, u.is_swooper, u.user_id
                        FROM swoops s
                        INNER JOIN users u
                        ON s.customer_id = u.user_id
                        WHERE s.customer_id = %s
                        ORDER BY status
                        """,
                        [user_id]
                    )
                    # process the query result
                    result = []
                    for record in db:
                        swoop = SwoopsOutWithUsers(
                            pickup_id=record[0],
                            customer_id=record[1],
                            swooper_id=record[2],
                            trash_type=record[3],
                            description=record[4],
                            picture_url=record[5],
                            hazards=record[6],
                            size=record[7],
                            weight=record[8],
                            status=record[9],
                            first_name=record[10],
                            last_name=record[11],
                            phone_number=record[12],
                            email=record[13],
                            address=record[14],
                            hashed_password=record[15],
                            username=record[16],
                            car=record[17],
                            license_number=record[18],
                            is_swooper=record[19]
                        )
                        result.append(swoop)

                    return result
        except Exception as e:
            print(e)
            return e
            # return {"message": "Could not get list of swoops"}

    def accept_job_swoop(self, pickup_id: int, pickup: SwoopsIn, account_data: dict) -> Union[Error, SwoopsAccept]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        '''
                        UPDATE swoops
                        SET status = 1, swooper_id = %s
                        WHERE pickup_id = %s
                        ''',
                        [
                            account_data["user_id"],
                            pickup_id
                        ]
                    )
                    return SwoopsAccept(pickup_id=pickup_id, swooper_id=account_data["user_id"], status=1)
        except Exception as e:
            print(e)
            return {"message": "Could not accept available pickup"}

    def complete_swoop_job(self, pickup_id: int, swoops: SwoopsIn,  account_data: dict) -> Union[Error, SwoopsAccept]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        '''
                        UPDATE swoops
                        SET status = 2, swooper_id = %s
                        WHERE pickup_id = %s AND status = 1
                        ''',
                        [
                            account_data["user_id"],
                            pickup_id
                        ]
                    )
                    return SwoopsAccept(pickup_id=pickup_id, swooper_id=account_data["user_id"], status=2)
        except Exception as e:
            print(e)
            return {"message": "Could not complete pickup"}



    def get_one_customerpost(self, pickup_id: int, user_id: int) -> Optional[SwoopsOutWithUsers]:
        try:
            with pool.connection() as conn:
                # get a cursor to execute SQL queries
                with conn.cursor() as db:
                    # execute the SELECT statement with JOIN
                    db.execute(
                        """
                        SELECT s.pickup_id, s.customer_id, s.swooper_id, s.trash_type, s.description, s.picture_url, s.hazards, s.size, s.weight, s.status,
                        u.first_name, u.last_name, u.phone_number, u.email, u.address, u.hashed_password, u.username, u.car, u.license_number, u.is_swooper, u.user_id
                        FROM swoops s
                        INNER JOIN users u
                        ON s.swooper_id = u.user_id
                        WHERE s.pickup_id = %s AND s.customer_id = %s
                        """,
                        [pickup_id, user_id]
                    )
                    # process the query result
                    record = db.fetchone()
                    if record is not None:
                        # extract columns from both tables
                        swoop = SwoopsOutWithUsers(
                            pickup_id=record[0],
                            customer_id=record[1],
                            swooper_id=record[2],
                            trash_type=record[3],
                            description=record[4],
                            picture_url=record[5],
                            hazards=record[6],
                            size=record[7],
                            weight=record[8],
                            status=record[9],
                            first_name=record[10],
                            last_name=record[11],
                            phone_number=record[12],
                            email=record[13],
                            address=record[14],
                            hashed_password=record[15],
                            username=record[16],
                            car=record[17],
                            license_number=record[18],
                            is_swooper=record[19]
                        )
                        return swoop
                    else:
                        return None
        except Exception as e:
            print(str(e))
            return None
    #         try:
    #             with pool.connection() as conn:
    #                 with conn.cursor() as db:
    #                     result = db.execute(
    #                         """
    #                         SELECT pickup_id, swooper_id, customer_id, trash_type, description, picture_url, hazards, size, weight, status
    #                         FROM swoops
    #                         WHERE pickup_id = %s AND customer_id = %s
    #                         """,
    #                         [pickup_id, user_id]
    #                     )
    #                     record = result.fetchone()
    #                     if record is None:
    #                         return None
    #                     return self.record_to_swoopsout(record)
    #         except Exception as e:
    #             print(e)
    #             return {"message": "Could not get post"}

    # def record_to_swoopsout(self, record):
    #     return SwoopsOut(
    #         pickup_id=record[0],
    #         swooper_id=record[1],
    #         customer_id=record[2],
    #         trash_type=record[3],
    #         description=record[4],
    #         picture_url=record[5],
    #         hazards=record[6],
    #         size=record[7],
    #         weight=record[8],
    #         status=record[9]
    #     )
