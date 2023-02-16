from fastapi import APIRouter
from queries.user import UsersOut

router = APIRouter()


@router.get("/users")
def get_users(users: UsersOut):
    return users

