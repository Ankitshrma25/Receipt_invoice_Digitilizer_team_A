from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.session import engine, Base
from app.api.v1.auth_routes import router as auth_router
from app.api.v1.invoice_routes import router as invoice_router
from app import models

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# create database tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Server running"}

app.include_router(auth_router)
app.include_router(invoice_router)