from sqlalchemy import Column, Integer, String, Boolean, Float, JSON, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String)
    slug = Column(String, unique=True, index=True)

    perfumes = relationship("Perfume", back_populates="category_rel")

class Perfume(Base):
    __tablename__ = "perfumes"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    brand = Column(String)
    category = Column(String, ForeignKey("categories.slug")) # Linking by slug for simplicity as per frontend data
    price = Column(Float)
    description = Column(String)
    notes = Column(JSON)
    image = Column(String)
    in_stock = Column(Boolean, default=True)
    featured = Column(Boolean, default=False)

    category_rel = relationship("Category", back_populates="perfumes")
