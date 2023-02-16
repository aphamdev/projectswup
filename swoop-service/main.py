from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import swoop, user
import os


app = FastAPI()
app.include_router(swoop.router)
app.include_router(user.router)
