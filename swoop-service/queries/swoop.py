from pydantic import BaseModel
from typing import Optional
from queries.pool import pool


class SwoopsIn(BaseModel):
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: int
    weight: int

class SwoopsOut(BaseModel):
    pickup_id: int
    trash_type: str
    description: str
    picture_url: str
    hazards: Optional[str]
    size: int
    weight: int


class SwoopsRepository:
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
                        (1, %s, %s, %s, %s, %s, %s)
                    RETURNING pickup_id;
                    """,
                    [
                        pickup.trash_type,
                        pickup.description,
                        pickup.picture_url,
                        pickup.hazards,
                        pickup.size,
                        pickup.weight
                    ]
                )
                pickup_id = result.fetchone()[0]
                # Return new data
                old_data = pickup.dict()
                return SwoopsOut(pickup_id=pickup_id, **old_data)
