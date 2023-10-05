from fastapi import APIRouter, status, HTTPException
from models.user import User, LoginUser
from database.database import db
from schemas.schemas import list_serial
from bson import ObjectId
from pymongo.errors import PyMongoError

collection = db["users"]

router = APIRouter(tags=["Users"], prefix="/auth")


@router.post("/login")
async def login(user: LoginUser):
    try:
        result = collection.find_one({"email": user.email})
        if result:
            # Remove the 'password' and '_id' fields to make the result JSON-serializable
            result.pop("password", None)
            result.pop("_id", None)
            return {"message": "User found", "user": result}
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
        result = collection.insert_one(dict(user))
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
