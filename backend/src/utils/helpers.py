import jwt
import bcrypt
from datetime import datetime, timedelta
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

from src.config.env import SECRET

def hash_password(password):
  return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password, hashed_password):
  return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_token(payload):
  payload = { **payload, 'exp': datetime.utcnow() + timedelta(minutes=30)}
  return jwt.encode(payload, SECRET, algorithm='HS256')

def decode_token(token):
  return jwt.decode(token, SECRET, algorithms=['HS256'])

async def error_handler(request: Request, call_next):
  try:
    return await call_next(request)
  except HTTPException as e:
    return JSONResponse(content={'error': e.detail}, status_code=e.status_code)
  except ValueError as e:
    return JSONResponse(content={'error': f'Error: {e}'}, status_code=400)
  except Exception as e:
    return JSONResponse(content={'error': f'Error: {e}'}, status_code=500)