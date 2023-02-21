import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user import UserRepo, UsersOut, UsersOutWithPassword


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        accounts: UserRepo,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        print(accounts.get, "this is getting account")
        return accounts.get(email)

    def get_account_getter(
        self,
        accounts: UserRepo = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: UsersOutWithPassword):
        # Return the encrypted password value from your
        # account object
        print(account, "this is the ACCOUNT")
        return account.hashed_password

    def get_account_data_for_cookie(self, account: UsersOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, UsersOut(**account.dict())


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
