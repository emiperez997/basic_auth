from peewee import MySQLDatabase
from datetime import datetime
from src.config.env import DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER

database = MySQLDatabase(
    DB_NAME,
    user=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
    autorollback=True
)