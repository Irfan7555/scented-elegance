# database.py
import os
import sys
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.engine.url import make_url
import psycopg2
from psycopg2 import sql
from psycopg2 import OperationalError

# Load .env
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError(
        "DATABASE_URL is not set. Add it to your .env, e.g.:\n"
        "DATABASE_URL=postgresql+psycopg2://postgres:password@localhost:5432/mydb"
    )

def create_database_if_not_exists(database_url: str, maintenance_db: str = "postgres"):
    """
    Parse database_url, connect to a maintenance DB (default 'postgres'),
    check if the target database exists, and create it if not.
    """
    # Parse URL using SQLAlchemy helper (handles dialect+driver prefixes)
    url_obj = make_url(database_url)

    # Extract components
    target_db = url_obj.database
    user = url_obj.username or os.getenv("USER") or None
    password = url_obj.password
    host = url_obj.host or "localhost"
    port = url_obj.port or 5432

    if not target_db:
        raise RuntimeError("Could not parse target database name from DATABASE_URL")

    # Connect to maintenance DB to create the target DB if missing
    try:
        conn = psycopg2.connect(
            dbname=maintenance_db,
            user=user,
            password=password,
            host=host,
            port=port,
            connect_timeout=5
        )
    except OperationalError as e:
        # Surface helpful message if we can't connect to the server
        raise RuntimeError(
            f"Unable to connect to PostgreSQL server at {host}:{port} "
            f"with user '{user}'. Original error: {e}"
        ) from e

    conn.autocommit = True
    try:
        with conn.cursor() as cur:
            # Check if database exists
            cur.execute(
                "SELECT 1 FROM pg_database WHERE datname = %s",
                (target_db,)
            )
            exists = cur.fetchone() is not None

            if not exists:
                # Use safe identifier quoting
                cur.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(target_db)))
                # Optionally you could set owner, encoding etc. here.
                print(f"Created database '{target_db}'")
            else:
                # DB exists; nothing to do
                pass
    finally:
        conn.close()

# Try to ensure DB exists before creating SQLAlchemy engine
create_database_if_not_exists(DATABASE_URL)

# PostgreSQL engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,     # keeps connections alive
    pool_size=10,           # optional but recommended
    max_overflow=20         # optional
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
