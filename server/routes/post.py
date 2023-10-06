from fastapi import APIRouter, status, HTTPException
from models.post import Post
from database.database import db
from schemas.schemas import list_serial
from bson import ObjectId
from pymongo.errors import PyMongoError  # Import PyMongoError

collection = db['posts']

router = APIRouter(
    tags=["Posts"],
    prefix="/post"
)

@router.get("/all", status_code=status.HTTP_200_OK)
async def get_todos():
    try:
        todos = list_serial(collection.find())
        return todos
    except PyMongoError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong: {str(e)}")
    

@router.post("/create",status_code=status.HTTP_201_CREATED)
async def post_post(post: Post):
    try:
        result = collection.insert_one(dict(post))
        inserted_id = str(result.inserted_id)
        return {"message": "Post created successfully", "inserted_id": inserted_id}
    except PyMongoError as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Something went wrong: {str(e)}")