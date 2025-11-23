from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import get_db, Base, engine
from . import models
from .routers import products, categories

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles
from fastapi import UploadFile, File
import shutil
import os

app.include_router(products.router)
app.include_router(categories.router)

# Mount static files
os.makedirs("backend/uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="backend/uploads"), name="uploads")

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    file_location = f"backend/uploads/{file.filename}"
    with open(file_location, "wb+") as buffer:
        shutil.copyfileobj(file.file, buffer)
    return {"url": f"http://localhost:8000/uploads/{file.filename}"}


@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/")
def read_root():
    return {"message": "Welcome to Scented Elegance Backend"}

# --- Seeding Endpoint (for demo purposes) ---
@app.post("/seed")
def seed_data(db: Session = Depends(get_db)):
    # Check if data exists
    if db.query(models.Category).first():
        return {"message": "Data already seeded"}

    # Categories
    categories_data = [
        {"id": "women", "name": "Women's Perfumes", "description": "Elegant and sophisticated fragrances for women", "slug": "women"},
        {"id": "men", "name": "Men's Perfumes", "description": "Bold and refined scents for men", "slug": "men"},
        {"id": "unisex", "name": "Unisex Scents", "description": "Contemporary fragrances for everyone", "slug": "unisex"},
        {"id": "exclusive", "name": "Exclusive Collections", "description": "Limited edition luxury perfumes", "slug": "exclusive"},
    ]
    
    for cat in categories_data:
        db.add(models.Category(**cat))
    
    # Perfumes
    perfumes_data = [
        {
            "id": "1", "name": "Velvet Rose", "brand": "Perfume Fort", "category": "women", "price": 12999,
            "description": "An enchanting floral fragrance that captures the essence of blooming roses at dawn. Sophisticated and timeless.",
            "notes": {"top": ["Bulgarian Rose", "Pink Pepper", "Bergamot"], "heart": ["Turkish Rose", "Jasmine", "Violet"], "base": ["Patchouli", "White Musk", "Amber"]},
            "image": "perfume-women-1", "in_stock": True, "featured": True
        },
        {
            "id": "2", "name": "Black Oud", "brand": "Perfume Fort", "category": "men", "price": 15999,
            "description": "A powerful and sophisticated fragrance with rich oud notes. Perfect for the modern gentleman.",
            "notes": {"top": ["Saffron", "Cardamom", "Black Pepper"], "heart": ["Oud Wood", "Leather", "Cedar"], "base": ["Vetiver", "Amber", "Musk"]},
            "image": "perfume-men-1", "in_stock": True, "featured": True
        },
        {
            "id": "3", "name": "Citrus Breeze", "brand": "Perfume Fort", "category": "unisex", "price": 10999,
            "description": "A refreshing and invigorating scent that combines citrus notes with subtle woody undertones.",
            "notes": {"top": ["Lemon", "Grapefruit", "Mandarin"], "heart": ["Neroli", "Green Tea", "Jasmine"], "base": ["Cedarwood", "Vetiver", "White Musk"]},
            "image": "perfume-unisex-1", "in_stock": True, "featured": False
        },
        {
            "id": "4", "name": "Royal Essence", "brand": "Perfume Fort Exclusive", "category": "exclusive", "price": 24999,
            "description": "A limited edition masterpiece crafted with the rarest ingredients. Pure luxury in a bottle.",
            "notes": {"top": ["Rare Iris", "Pink Pepper", "Bergamot"], "heart": ["Damask Rose", "Tuberose", "Ylang-Ylang"], "base": ["Agarwood", "Sandalwood", "Tonka Bean"]},
            "image": "perfume-exclusive-1", "in_stock": True, "featured": True
        }
    ]

    for perf in perfumes_data:
        db.add(models.Perfume(**perf))

    db.commit()
    return {"message": "Database seeded successfully"}
