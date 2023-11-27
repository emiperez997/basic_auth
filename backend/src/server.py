from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from src.config.database import database
from src.models.models import User

from src.routes import api_router
from src.utils.helpers import error_handler

from src.utils.origins import ORIGINS

from src.config.env import DEBUG

# This is a context manager that will be used to connect and close the database connection
# This will execute before the server starts and after it stops
@asynccontextmanager
async def lifespan(app: FastAPI):
  try:
    if database.is_closed():
      database.connect()
      # print("Database connected")

    # Create tables if they don't exist
    database.create_tables([User])

    yield
  finally:
    if not database.is_closed():
      database.close()

app = FastAPI(
  title='Blog API project',
  description='This is a simple API for a blog',
  version='1.0.0',
  lifespan=lifespan,
  debug=DEBUG
)

# Routes
app.include_router(api_router, prefix='/api')

# Error handler
app.middleware('http')(error_handler)

# Cors
app.add_middleware(
  CORSMiddleware,
  allow_origins=ORIGINS,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)