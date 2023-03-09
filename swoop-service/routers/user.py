# router.py
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel
from queries.user import (
    UsersProfileUpdate,
    UsersOut,
    UsersIn,
    UserRepo,
    UserUpdate,
    UsersOutWithPassword,
    UserDelete
)
from typing import List


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UsersOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: UsersIn,
    request: Request,
    response: Response,
    accounts: UserRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())

############################################################################


@router.get("/api/accounts", response_model=UsersOut)
def get_user(
    repo: UserRepo = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> UsersOut:
    email = user_data['email']
    return repo.get(email)

############################################################################


@router.get("/api/accounts/all", response_model=List[UsersOut])
def get_users(
    repo: UserRepo = Depends(),
    # user_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_users()

############################################################################


@router.put("/api/accounts/{user_id}", response_model=UserUpdate)
def update_user_form_swoop(
    user_id: int,
    users: UserUpdate,
    repo: UserRepo = Depends(),
) -> UsersIn:
    return repo.update(user_id, users)
############################################################################


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UsersOutWithPassword = Depends(
        authenticator.try_get_current_account_data
    )
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "token_type": "Bearer",
            "account": account,
        }

#############################################################


@router.put("/api/profile/{user_id}", response_model=UsersProfileUpdate)
def update_profile(
    user_id: int,
    users: UsersProfileUpdate,
    repo: UserRepo = Depends(),
) -> UsersIn:
    return repo.update_profile(user_id, users)

#############################################################


@router.delete("/delete", response_model=UserDelete)
def delete_profile(
    repo: UserRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.delete(account_data)
