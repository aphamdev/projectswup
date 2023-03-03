from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import swoop, user
import os
from authenticator import authenticator

os.environ["CORS_HOST"] = "https://projectswup.gitlab.io"

app = FastAPI()
app.include_router(swoop.router)
app.include_router(user.router)
app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get(
            "CORS_HOST",
            "http://localhost:3000"
        )
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
