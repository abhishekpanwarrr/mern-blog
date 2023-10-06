from fastapi import APIRouter, status, HTTPException, Depends
from models.user import User, LoginUser
from database.database import db
from schemas.schemas import list_serial
from bson import ObjectId
from pymongo.errors import PyMongoError
from hashing import Hash
from jwttoken import create_access_token
from fastapi.security import OAuth2PasswordRequestForm

collection = db["users"]

router = APIRouter(tags=["Users"], prefix="/auth")


@router.post("/login")
async def login(user: LoginUser):
    try:
        result = collection.find_one({"email": user.email})
        if result:
            if not Hash.verify(result["password"], user.password):
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
            access_token = create_access_token(data={"sub": user.email})
            return {"access_token": access_token, "token_type": "bearer"}
        else:
            return {"message": "User not found"}
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Something went wrong: {str(e)}",
        )


@router.post("/register", status_code=status.HTTP_200_OK)
async def register(user: User):
    try:
        hashed_pass = Hash.bcrypt(user.password)
        user.password = hashed_pass
        user_dict = user.__dict__
        user_dict.pop("__dict__", None)
        result = collection.insert_one(user_dict)
        inserted_id = str(result.inserted_id)
        return {"message": "User created successfully", "inserted_id": inserted_id}
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Something went wrong: {str(e)}",
        )


# @router.post("/login")
# def login(request: OAuth2PasswordRequestForm = Depends()):
#     user = db["users"].find_one({"username": request.username})
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
# if not Hash.verify(user["password"], request.password):
#     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
# access_token = create_access_token(data={"sub": user["username"]})
# return {"access_token": access_token, "token_type": "bearer"}
