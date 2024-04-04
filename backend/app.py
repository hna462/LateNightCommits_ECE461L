import os

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient


app = Flask(__name__)
CORS(app, supports_credentials=True)
import project
#import auth
import resources


    
    
# if __name__ == "__main__":
#     app.run(debug=False)