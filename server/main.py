from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.post import router as postRouter
from routes.users import router as userRouter
app = FastAPI()

app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(router=postRouter)
app.include_router(router=userRouter)