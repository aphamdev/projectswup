from fastapi import APIRouter, Depends
from queries.swoop import SwoopsIn, SwoopsRepository, SwoopsOut, SwoopsAccept, Error, SwoopsOutWithUsers
from typing import Union, List, Optional
from authenticator import authenticator

router = APIRouter()


@router.post("/pickups")
def create_pickups(
    pickup: SwoopsIn,
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.create(pickup, account_data)

@router.get("/listings", response_model=Union[Error, List[SwoopsOutWithUsers]])
def get_all_available_swoops(repo: SwoopsRepository = Depends()):
    return repo.get_all_available()


@router.get("/swoops", response_model=Union[List[SwoopsOutWithUsers], Error])
def get_swooper_history(
    repo: SwoopsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_data["user_id"]
    return repo.get_swooper_history(user_id)


@router.get("/pickups", response_model=Union[Error, List[SwoopsOutWithUsers]])
def get_all_customer_posts(
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = account_data["user_id"]
    return repo.get_all_customer_posts(user_id)

@router.put("/swoops/accept/{pickup_id}", response_model=Union[Error, SwoopsAccept])
def update_swoop_to_accepted(
    pickup_id: int,
    swoops: SwoopsIn,
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[Error, SwoopsAccept]:
    return repo.accept_job_swoop(pickup_id, swoops, account_data)

@router.put("/swoops/complete/{pickup_id}", response_model=Union[Error, SwoopsAccept])
def complete_swoop_job(
    pickup_id: int,
    swoops: SwoopsIn,
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, SwoopsAccept]:
    return repo.complete_swoop_job(pickup_id, swoops, account_data)

@router.get("/swoops/{pickup_id}", response_model=Optional[SwoopsOutWithUsers])
def get_one_swoop(
    pickup_id: int,
    repo: SwoopsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> SwoopsOutWithUsers:
    user_id = user_data["user_id"]
    return repo.get_one_swoop(pickup_id, user_id)

@router.get("/pickups/{pickup_id}", response_model=Optional[SwoopsOutWithUsers])
def get_one_customerpost(
    pickup_id: int,
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> SwoopsOutWithUsers:
    user_id = account_data["user_id"]
    return repo.get_one_customerpost(pickup_id, user_id)
