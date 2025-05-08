from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  
from routes.user_route import router as user_router
from routes.auth_route import auth_router
from config.db import Base, engine
from routes.model_route import model_router
from routes.ats_route import ats_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def index():
    return {"hello world"}

app.include_router(user_router, prefix="/users", tags=["Users"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(model_router, prefix="/api", tags=["Model"])
app.include_router(ats_router, prefix="/ats", tags=["ATS"])
