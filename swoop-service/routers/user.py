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

from queries.user import UsersOut, UsersIn, UserRepo, DuplicateAccountError


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
    print(info,"this is info")
    print(info.password, "this is the password")
    print(accounts,"this is accounts")
    hashed_password = authenticator.hash_password(info.password)
    print(hashed_password, "this is the hashed pwd")
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    print(form, "this is the form")
    print(request, response, "this is reequest and response")
    token = await authenticator.login(response, request, form, accounts)
    print(token, "this is the token")
    return AccountToken(account=account, **token.dict())
