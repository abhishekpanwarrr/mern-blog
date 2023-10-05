from pydantic import BaseModel


class Post(BaseModel):
    title: str
    summary: str
    content: str
    cover: str
    tags: list[str]
