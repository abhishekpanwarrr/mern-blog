def individual_serial(todo) -> dict:
    return {
        "id": str(todo["_id"]),
        "title": str(todo["title"]),
        "summary": str(todo["summary"]),
        "content": str(todo["content"]),
        "cover": str(todo["cover"]),
        "tags": list(todo["tags"]),
    }


def list_serial(todos) -> list:
    return [individual_serial(todo) for todo in todos]

