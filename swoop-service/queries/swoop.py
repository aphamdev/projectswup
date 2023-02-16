from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool

class Error(BaseModel):
    message:str


class SwoopsIn(BaseModel):
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: int
    weight: int
    status: int

class SwoopsOut(BaseModel):
    pickup_id: int
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: int
    weight: int
    status: int

class SwoopsRepository:
    def get_swooper_history(self) -> Union[Error,List[SwoopsOut]]:
        # connect to the database
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with which is PG-admin in our case)
                with conn.cursor() as db:
                    # execute the SELECT statement
                    db.execute(
                        """
                        SELECT pickup_id, trash_type, description, picture_url, hazards, size, weight
                        FROM swoops
                        WHERE status = 2 AND customer_id = %s
                        """
                    )
                    # process the query result
                    result = []
                    for record in db:
                        swoop = SwoopsOut(
                            pickup_id=record[0],
                            trash_type=record[1],
                            description=record[2],
                            picture_url=record[3],
                            hazards=record[4],
                            size=record[5],
                            weight=record[6],
                        )
                        result.append(swoop)

                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get list of swoops"}


    def create(self, pickup: SwoopsIn) -> SwoopsOut:
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
                        (2, %s, %s, %s, %s, %s, %s)
                    RETURNING pickup_id;
                    """,
                    [
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
                return SwoopsOut(pickup_id=pickup_id, **old_data)
