from sqlalchemy.orm import sessionmaker
from models.user import db


def get_session():
    try:
        Session = sessionmaker(bind=db)
        session = Session()
        yield session
    finally:
        session.close()