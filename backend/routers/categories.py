from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas

router = APIRouter(
    prefix="/categories",
    tags=["categories"],
)

@router.get("/", response_model=List[schemas.Category])
def get_categories(db: Session = Depends(get_db)):
    return db.query(models.Category).all()
