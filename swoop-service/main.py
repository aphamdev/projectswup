from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import swoop
import os


app = FastAPI()
app.include_router(swoop.router)
