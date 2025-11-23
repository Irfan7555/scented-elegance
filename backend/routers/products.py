from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from ..database import get_db
from .. import models, schemas

router = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.Perfume])
def get_products(category: Optional[str] = None, featured: Optional[bool] = None, db: Session = Depends(get_db)):
    query = db.query(models.Perfume)
    if category and category != 'all':
        query = query.filter(models.Perfume.category == category)
    if featured:
        query = query.filter(models.Perfume.featured == True)
    return query.all()

@router.get("/{product_id}", response_model=schemas.Perfume)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(models.Perfume).filter(models.Perfume.id == product_id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=schemas.Perfume)
def create_product(product: schemas.PerfumeCreate, db: Session = Depends(get_db)):
    # Generate ID (simple UUID or similar)
    import uuid
    db_product = models.Perfume(id=str(uuid.uuid4()), **product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=schemas.Perfume)
def update_product(product_id: str, product_update: schemas.PerfumeUpdate, db: Session = Depends(get_db)):
    db_product = db.query(models.Perfume).filter(models.Perfume.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db.commit()
    db.refresh(db_product)
    return db_product

@router.delete("/{product_id}")
def delete_product(product_id: str, db: Session = Depends(get_db)):
    db_product = db.query(models.Perfume).filter(models.Perfume.id == product_id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}

