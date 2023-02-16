from fastapi import APIRouter, Depends
from queries.swoop import SwoopsIn, SwoopsRepository, SwoopsOut, Error
from typing import Union, List

router = APIRouter()


@router.post("/pickups")
def create_pickups(pickup: SwoopsIn, repo: SwoopsRepository = Depends()):
    return repo.create(pickup)


@router.get("/swoops", response_model=Union[List[SwoopsOut], Error])
def get_swooper_history(
    repo: SwoopsRepository = Depends()
):
    return repo.get_swooper_history()
