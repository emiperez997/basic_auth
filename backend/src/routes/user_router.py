from re import U
from fastapi import APIRouter, Cookie, HTTPException, Header, Response

from typing import List

from fastapi.security import HTTPBasicCredentials
from src.schemas.schemas import AuthResponse, GenericResponse, UserListResponse, UserPutRequest, UserPutResponse, UserRequest, UserResponse, ErrorResponse
from src.models.models import User

from src.utils.helpers import hash_password, check_password, create_token, decode_token

user_router = APIRouter()

@user_router.get('/', response_model=UserListResponse, responses={400: {'model': ErrorResponse}})
async def get_users():  
  total_users = User.select()

  return UserListResponse(
    users=total_users, 
  )

@user_router.get('/{user_id}', response_model=UserResponse, responses={400: {'model': ErrorResponse}})
async def get_user(user_id: int, token: str = Header(None)):

  if token == None:
    raise HTTPException(status_code=401, detail='Unauthorized: No token provided')

  user_id_token = decode_token(token)['user_id']

  if user_id_token != user_id:
    raise HTTPException(status_code=401, detail='Unauthorized: Invalid token')

  user = User.select().where(User.id == user_id).first()

  if user is None:
    raise HTTPException(status_code=404, detail='User not found')

  return user

@user_router.post('/', response_model=UserResponse, responses={400: {'model': ErrorResponse}})
async def create_user(user: UserRequest): 
  user.password = hash_password(user.password)
  user = User.create(**user.model_dump())

  return user

@user_router.put('/{user_id}', response_model=UserPutResponse, responses={400: {'model': ErrorResponse}})
async def update_user(user_id: int, user: UserPutRequest, token: str = Header(None)):
  if token == None:
    raise HTTPException(status_code=401, detail='Unauthorized: No token provided')

  user_id_token = decode_token(token)['user_id']


  if user_id_token != user_id:
    raise HTTPException(status_code=401, detail='Unauthorized: Invalid token')

  user_db = User.select().where(User.id == user_id).first()

  if user_db is None:
    raise HTTPException(status_code=404, detail='User not found')

  user_db.username = user.username
  user_db.email = user.email

  user_db.save()

  return user_db

@user_router.post('/login', response_model=AuthResponse, responses={400: {'model': ErrorResponse}})
async def login(credentials: HTTPBasicCredentials, response: Response):
  if User.select().where(User.username == credentials.username).first() == None:
    raise HTTPException(status_code=404, detail='User not found')

  user = User.get(User.username == credentials.username)

  if not check_password(credentials.password, user.password):
    raise HTTPException(status_code=400, detail='Invalid password')

  token = create_token({ 'user_id': user.id })

  return AuthResponse(token=token) 