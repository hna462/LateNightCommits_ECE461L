from flask import Flask, request, jsonify, json
from app import app

@app.route('/')
def index():
    return "Welcome to the Flask API!"

