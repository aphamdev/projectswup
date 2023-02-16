from fastapi import APIRouter, Depends
from queries.swoop import SwoopsIn, SwoopsRepository

router = APIRouter()


@router.post("/pickups")
def create_pickups(pickup: SwoopsIn, repo: SwoopsRepository = Depends()):
    return repo.create(pickup)
