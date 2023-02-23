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
from queries.user import UsersOut, UsersIn, UserRepo, DuplicateAccountError, UserUpdate, UsersOutWithPassword
from typing import Union, List, Optional


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
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())

#####################################################################################################

@router.get("/accounts/{user_id}", response_model=UsersOut)
def get_user(
    email: str,
    repo: UserRepo = Depends(),
) -> UsersOut:
    return repo.get(email)

#####################################################################################################

@router.put("/accounts/{user_id}", response_model=UserUpdate)
def update_user_form_swoop(
    user_id: int,
    users: UserUpdate,
    repo: UserRepo = Depends(),
) -> UsersIn:
    return repo.update(user_id, users)


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: UsersOutWithPassword = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        print(account, " TTTHHHHHISSSS ISSS ACCCOUUUNNTTT FROM TOKEEEENNNNNN")
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
