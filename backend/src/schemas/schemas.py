from tabnanny import check
from typing import List
from fastapi import HTTPException
from pydantic import BaseModel, ConfigDict, EmailStr, field_validator

# -------- Response -------- #
class ErrorResponse(BaseModel):
    status_code: int
    message: str

class ResponseBaseModel(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class GenericResponse(BaseModel):
    message: str

class ResponseModel(BaseModel):
    pass


# -------- User -------- #
class UserValidator():
    @field_validator("username")
    def validate_username(cls, username):
        if len(username) < 3:
            raise ValueError("Username must be at least 3 characters long")

        if len(username) > 50:
            raise ValueError("Username must be less than 255 characters long")

        return username

    @field_validator("password", check_fields=False)
    def validate_password(cls, password):
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters long")

        if len(password) > 50:
            raise ValueError("Password must be less than 255 characters long")

        if not password.isalnum():
            raise ValueError("Password must be alphanumeric")

        return password

class UserRequest(BaseModel, UserValidator):
    username: str
    email: EmailStr
    password: str

class UserResponse(ResponseBaseModel):
    id: int
    username: str
    email: EmailStr
    

class UserListResponse(ResponseModel):
    users: List[UserResponse]

class UserPutRequest(BaseModel, UserValidator):
    username: str
    email: EmailStr

class UserPutResponse(ResponseBaseModel):
    id: int
    username: str
    email: EmailStr
    
    
# -------- Auth -------- #

class AuthResponse(ResponseModel):
    token: str
    
