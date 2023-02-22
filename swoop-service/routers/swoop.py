from fastapi import APIRouter, Depends
from queries.swoop import SwoopsIn, SwoopsRepository, SwoopsOut, Error
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

@router.get("/listings", response_model=Union[Error, List[SwoopsOut]])
def get_all_available_swoops(repo: SwoopsRepository = Depends()):
    return repo.get_all_available()


@router.get("/swoops", response_model=Union[List[SwoopsOut], Error])
def get_swooper_history(
    repo: SwoopsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
):
    user_id = user_data["user_id"]
    return repo.get_swooper_history(user_id)


@router.get("/pickups", response_model=Union[Error, List[SwoopsOut]])
def get_all_customer_posts(
    repo: SwoopsRepository = Depends(),
):
    return repo.get_all_customer_posts()

@router.put("/swoops/accept/{pickup_id}", response_model=Union[Error, SwoopsOut])
def update_swoop_to_accepted(
    pickup_id: int,
    swoops: SwoopsIn,
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data)
) -> Union[Error, SwoopsOut]:
    return repo.accept_job_swoop(pickup_id, swoops, account_data)

@router.put("/swoops/complete/{pickup_id}", response_model=Union[Error, SwoopsOut])
def complete_swoop_job(
    pickup_id: int,
    swoops: SwoopsIn,
    repo: SwoopsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[Error, SwoopsOut]:
    return repo.complete_swoop_job(pickup_id, swoops, account_data)

@router.get("/swoops/{pickup_id}", response_model=Optional[SwoopsOut])
def get_one_swoop(
    pickup_id: int,
    repo: SwoopsRepository = Depends(),
    user_data: dict = Depends(authenticator.get_current_account_data),
) -> SwoopsOut:
    user_id = user_data["user_id"]
    return repo.get_one_swoop(pickup_id, user_id)
