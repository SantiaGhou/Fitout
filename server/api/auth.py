from fastapi import APIRouter, Depends, HTTPException
from models.user import User
from database.session import get_session
from main import bcrypt_context
from schemas.user import UserSchema, LoginSchema
from sqlalchemy.orm import Session


auth_router = APIRouter(prefix="/auth", tags=["auth"])


def create_token(id_usuario):
    token = f'fajjasdjnasjasdasd{id_usuario}asdasdasd'
    return token

def authenticate_user(email, password, session):
    user = session.query(User).filter(User.email == email).first()
    if not user:
        return False
    elif not bcrypt_context.verify(password, user.password):
        return False
    else:
        return user


@auth_router.post("/register")
async def register(userschema: UserSchema, session: Session = Depends(get_session)):
    '''Rota de registro'''

    user = session.query(User).filter(User.email == userschema.email).first()
    if user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")
    else:
        password_hash = bcrypt_context.hash(userschema.password)
        new_user = User(userschema.name, userschema.email, password_hash, userschema.admin)
        session.add(new_user)
        session.commit()
        return {"message": f"Usuário criado com sucesso {userschema.email}"}
    
@auth_router.post("/login")
async def login(loginschema: LoginSchema, session: Session = Depends(get_session)):
    '''Rota de login'''
    user = authenticate_user(loginschema.email, loginschema.password, session)
    if not user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado ou credenciais inválidas")
    else:
        access_token = create_token(user.id)
        return {"access_token": access_token,
                "token_type": "bearer"
                }
