from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import declarative_base


db = create_engine('sqlite:///database/base.db')
Base = declarative_base()


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50))
    email = Column(String(50), nullable=False, unique=True)
    password = Column(String(50))
    admin = Column(Boolean, default=False)

    def __init__(self, name, email, password, admin=False):
        self.name = name
        self.email = email
        self.password = password
        self.admin = admin