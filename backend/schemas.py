from pydantic import BaseModel
from typing import List, Optional, Dict

class CategoryBase(BaseModel):
    id: str
    name: str
    description: str
    slug: str

class Category(CategoryBase):
    class Config:
        from_attributes = True

class PerfumeBase(BaseModel):
    name: str
    brand: str
    category: str
    price: float
    description: str
    notes: Dict[str, List[str]]
    image: str
    in_stock: bool
    featured: Optional[bool] = False

class Perfume(PerfumeBase):
    id: str
    
    class Config:
        from_attributes = True

class PerfumeCreate(PerfumeBase):
    pass

class PerfumeUpdate(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    notes: Optional[Dict[str, List[str]]] = None
    image: Optional[str] = None
    in_stock: Optional[bool] = None
    featured: Optional[bool] = None

