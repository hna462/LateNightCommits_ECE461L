import os

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient


app = Flask(__name__)
CORS(app, supports_credentials=True)
import project
import auth
import resources

# from flask import Flask, request, jsonify, json
# app = Flask(__name__)

# @app.route('/')
# def hello_world():
#     return 'Hello, Welcome to 6:30pm class. How are you?'
    
    
# if __name__ == "__main__":
#     app.run(debug=False)