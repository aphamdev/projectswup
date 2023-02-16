from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user
import os


app = FastAPI()
app.include_router(user.router)
