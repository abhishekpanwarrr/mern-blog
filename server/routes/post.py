from fastapi import APIRouter, status, HTTPException
from models.post import Post
from database.database import db
from schemas.schemas import list_serial
from bson import ObjectId
from pymongo.errors import PyMongoError  # Import PyMongoError
from bson import ObjectId
from fastapi.responses import JSONResponse

collection = db["posts"]

router = APIRouter(tags=["Posts"], prefix="/post")


@router.get("/all", status_code=status.HTTP_200_OK)
async def get_todos():
    try:
        todos = list_serial(collection.find())
        return todos
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Something went wrong: {str(e)}",
        )


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def post_post(post: Post):
    try:
        result = collection.insert_one(dict(post))
        inserted_id = str(result.inserted_id)
        return {"message": "Post created successfully", "inserted_id": inserted_id}
    except PyMongoError as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Something went wrong: {str(e)}",
        )


@router.get("/{post_id}")
async def get_single(post_id):
    try:
        post = collection.find_one({"_id": ObjectId(post_id)})
        if post:
            post["_id"] = str(post["_id"])
            return JSONResponse(content=post, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="Post not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
