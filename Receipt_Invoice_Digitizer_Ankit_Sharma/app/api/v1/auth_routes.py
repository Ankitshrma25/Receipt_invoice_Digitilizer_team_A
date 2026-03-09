from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.services.auth_service import register_user, login_user
from app.schemas.user_schema import UserCreate, UserLogin
from google.oauth2 import id_token
from google.auth.transport.requests import Request

from app.models import User
from app.core.security import create_access_token


router = APIRouter(prefix="/auth", tags=["auth"])


GOOGLE_CLIENT_ID = "750118919967-4398nhm57bt0gdml5inndiac5oh0d1q1.apps.googleusercontent.com"

request_adapter = Request()


# UserRegister Endpoint
@router.post("/register")
def register(data: UserCreate, db: Session = Depends(get_db)):
    # check user is already registered or not
    user = register_user(db, data)
    if not user:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User created"}


# userlogin endpoint
@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    user, token = login_user(db, data)

    if not token:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "id": user.user_id,
            "name": user.user_name,
            "email": user.user_email
        }
    }


# Google Login
@router.post("/google")
def google_login(payload: dict, db: Session = Depends(get_db)):

    token = payload.get("token")

    if not token:
        raise HTTPException(status_code=400, detail="Token not provided")

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            request_adapter,
            audience=GOOGLE_CLIENT_ID
        )

    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google token")

    email = idinfo["email"]
    name = idinfo.get("name", email.split("@")[0])

    # Check if user exists
    user = db.query(User).filter(User.user_email == email).first()

    # If user does not exist, create one
    if not user:
        user = User(
            user_name=name,
            user_email=email,
            user_password="google_auth"  # placeholder password
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    # Create JWT token
    access_token = create_access_token({
        "sub": str(user.user_id),
        "role": user.role
    })

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": {
            "id": user.user_id,
            "name": user.user_name,
            "email": user.user_email
        }
    }