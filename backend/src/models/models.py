from peewee import Model, CharField, DateTimeField, ForeignKeyField, IntegerField, TextField
from datetime import datetime
from src.config.database import database

# Models
class User(Model):
    username = CharField(max_length=255, unique=True)
    email = CharField(max_length=255, unique=True)
    password = CharField(max_length=255)
    created_at = DateTimeField(default=datetime.now)

    def __str__(self):
        return self.username
    
    class Meta:
        database = database
        table_name = "users"