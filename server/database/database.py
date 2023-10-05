import certifi
from pymongo.mongo_client import MongoClient

ca = certifi.where()

client = MongoClient("mongodb+srv://abhishekpanwarrr:abhishekpanwarrr@cluster0.5p3hyz0.mongodb.net/blog?retryWrites=true&w=majority", tlsCAFile=ca)
db = client["blog"]

