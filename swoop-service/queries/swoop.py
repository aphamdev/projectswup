from pydantic import BaseModel
from typing import Optional, List, Union
from fastapi.security import OAuth2PasswordBearer
from queries.user import UsersIn
from queries.pool import pool
from fastapi import APIRouter, Depends


class Error(BaseModel):
    message: str


class SwoopsIn(BaseModel):
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: int
    weight: int


class SwoopsOut(BaseModel):
    pickup_id: int
    customer_id: int
    swooper_id: Optional[int]
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: int
    weight: int
    status: int


class SwoopsRepository:
    def get_one_swoop(self, pickup_id: int, user_id) -> Optional[SwoopsOut]:
    # connect to the database
        print(pickup_id)
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with which is PG-admin in our case)
                with conn.cursor() as db:
                    # execute the SELECT statement
                    db.execute(
                        """
                        SELECT pickup_id, trash_type, description, picture_url, hazards, size, weight, status
                        FROM swoops
                        WHERE pickup_id = %s AND swooper_id = %s
                        """,
                        [pickup_id, user_id]
                    )
                    # process the query result
                    record = db.fetchone()
                    print(record)
                    if record is not None:
                        swoop = SwoopsOut(
                            pickup_id=record[0],
                            swooper_id=record[1],
                            trash_type=record[2],
                            description=record[3],
                            picture_url=record[4],
                            hazards=record[5],
                            size=record[6],
                            weight=record[7],
                            status=record[8]
                        )
                        return swoop
                    else:
                        return None

        except Exception as e:
            print(e)
            return {"message": "Could not get that swoop"}
    def get_swooper_history(self, user_id) -> Union[Error,List[SwoopsOut]]:
        # connect to the database
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with which is PG-admin in our case)
                with conn.cursor() as db:
                    # execute the SELECT statement
                    db.execute(
                        """
                        SELECT pickup_id, swooper_id, trash_type, description, picture_url, hazards, size, weight, status
                        FROM swoops
                        WHERE swooper_id = %s
                        """,
                        [user_id]
                    )
                    # process the query result
                    result = []
                    for record in db:
                        swoop = SwoopsOut(
                            pickup_id=record[0],
                            swooper_id = record[1],
                            trash_type=record[2],
                            description=record[3],
                            picture_url=record[4],
                            hazards=record[5],
                            size=record[6],
                            weight=record[7],
                            status=record[8]
                        )
                        result.append(swoop)

                    return result

        except Exception as e:
            print(e)
            return e
            # return {"message": "Could not get list of swoops"}

    # Creating a pickup as a regular customer.
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

    def get_all_available(self) -> Union[Error, List[SwoopsOut]]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        '''
                        SELECT pickup_id, customer_id, trash_type, description, picture_url, hazards, size, weight, status
                        FROM swoops
                        WHERE status = 0
                        ORDER BY pickup_id
                        '''
                    )
                    result = []
                    for post in db:
                        swoop = SwoopsOut(
                            pickup_id=post[0],
                            customer_id=post[1],
                            trash_type=post[2],
                            description=post[3],
                            picture_url=post[4],
                            hazards=post[5],
                            size=post[6],
                            weight=post[7],
                            status=post[8],
                        )
                        result.append(swoop)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all available swoops"}



    def get_all_customer_posts(self) -> Union[Error,List[SwoopsOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                            SELECT pickup_id, customer_id, trash_type, description, picture_url, hazards, size, weight, status
                            FROM swoops
                            WHERE customer_id = 1
                            ORDER BY pickup_id DESC

                        """
                    )
                    result = []
                    for record in db:
                        swoop = SwoopsOut(
                            pickup_id=record[0],
                            customer_id=record[1],
                            trash_type=record[2],
                            description=record[3],
                            picture_url=record[4],
                            hazards=record[5],
                            size=record[6],
                            weight=record[7],
                            status=record[8]
                            )
                        result.append(swoop)
                    return result
        except Exception as e:
            print(e)
            return {"message": "Could not get all swoops"}

    def accept_job_swoop(self, pickup_id: int, swoops: SwoopsIn) -> Union[Error, SwoopsOut]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        '''
                        UPDATE swoops
                        SET status = 1
                        WHERE pickup_id = %s
                        ''',
                        [
                            pickup_id
                        ]
                    )
                    old_data = swoops.dict()
                    return SwoopsOut(pickup_id=pickup_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not accept available pickup"}

    def complete_swoop_job(self, pickup_id: int, swoops: SwoopsIn) -> Union[Error, SwoopsOut]:
        try:
            # Connect the database
            with pool.connection() as conn:
                # Get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    db.execute(
                        '''
                        UPDATE swoops
                        SET status = 2
                        WHERE pickup_id = %s AND status = 1
                        ''',
                        [
                            pickup_id
                        ]
                    )
                    old_data = swoops.dict()
                    return SwoopsOut(pickup_id=pickup_id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not accept available pickup"}
