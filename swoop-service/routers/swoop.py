from fastapi import APIRouter, Depends
from queries.swoop import SwoopsIn, SwoopsRepository, SwoopsOut, Error
from typing import Union, List

router = APIRouter()


@router.post("/pickups")
def create_pickups(pickup: SwoopsIn, repo: SwoopsRepository = Depends()):
    return repo.create(pickup)

@router.get("/listings", response_model=Union[Error, List[SwoopsOut]])
def get_all_available_swoops(repo: SwoopsRepository = Depends()):
    return repo.get_all_available()

@router.get("/swoops", response_model=Union[List[SwoopsOut], Error])
def get_swooper_history(
    repo: SwoopsRepository = Depends()
):
    return repo.get_swooper_history()

@router.get("/pickups", response_model=Union[Error, List[SwoopsOut]])
def get_all_customer_posts(
    repo: SwoopsRepository = Depends(),
):
    return repo.get_all_customer_posts()

@router.put("/swoops/accept/{pickup_id}", response_model=Union[Error, SwoopsOut])
def update_swoop_to_accepted(
    pickup_id: int,
    swoops: SwoopsIn,
    repo: SwoopsRepository = Depends()
) -> Union[Error, SwoopsOut]:
    return repo.accept_job_swoop(pickup_id, swoops)

@router.put("/swoops/complete/{pickup_id}", response_model=Union[Error, SwoopsOut])
def complete_swoop_job(
    pickup_id: int,
    swoops: SwoopsIn,
    repo: SwoopsRepository = Depends()
) -> Union[Error, SwoopsOut]:
    return repo.complete_swoop_job(pickup_id, swoops)
