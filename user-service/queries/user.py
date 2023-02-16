from pydantic import BaseModel

class UsersOut(BaseModel):
    first_name: str
    last_name: str
    phone_number: int
    email: str
    address: str
