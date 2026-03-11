# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta, timezone

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# SECRET_KEY = "Mein Nhi Bataunga"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30


# # Function to convert plain password to hash password
# def hash_password(password: str):
#     # bcrypt supports max 72 bytes
#     password_bytes = password.encode("utf-8")[:72]
#     return pwd_context.hash(password_bytes)


# # Function to verify password
# def verify_password(plain: str, hashed: str):
#     plain_bytes = plain.encode("utf-8")[:72]
#     return pwd_context.verify(plain_bytes, hashed)


# # Access token
# def create_access_token(data: dict):
#     to_encode = data.copy()
#     expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     to_encode.update({"exp": expire})
#     return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "Mein Nhi Bataunga"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2 scheme (token will be read from Authorization header)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


# Function to convert plain password to hash password
def hash_password(password: str):
    password_bytes = password.encode("utf-8")[:72]
    return pwd_context.hash(password_bytes)


# Function to verify password
def verify_password(plain: str, hashed: str):
    plain_bytes = plain.encode("utf-8")[:72]
    return pwd_context.verify(plain_bytes, hashed)


# Access token generator
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


# Get current user from JWT token
def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid authentication")

        return user_id

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")