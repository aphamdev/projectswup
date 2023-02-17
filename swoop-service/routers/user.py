from fastapi import APIRouter, Depends
from queries.user import UsersOut, UsersIn, UserRepo

router = APIRouter()


@router.get("/users")
def get_users(users: UsersOut):
    return users

@router.post("/users")
def create_users(users: UsersIn, repo: UserRepo = Depends()):
    # repo.create(users)
    return repo.create(users)
