# uvicorn main:app --reload
from fastapi import FastAPI 
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

SECRET_KEY = os.getenv('SECRET_KEY')

app = FastAPI() 

bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

from api.auth import auth_router

app.include_router(auth_router)

