from flask import Flask, request, jsonify, json
from app import app
import json
@app.route('/')
def index():
    return "Welcome to the Flask API!"

@app.route("/checkIn/", methods=['POST'])
def checkIn_hardware():
    data = request.json
    qty =0
    if data['qty'] != '' and int(data['qty'])>0:
     qty = data['qty']
    projectid = data['projectid']
    print(f"{qty} hardware checked in")
    return json.dumps({'qty': qty, 'projectid': projectid })
   
@app.route("/checkOut/", methods=['POST'])
def checkOut_hardware():
    data = request.json
    qty =0
    if data['qty'] != '' and int(data['qty'])>0:
     qty = data['qty']
    projectid = data['projectid']
    print(f"{qty} hardware checked out")
    return json.dumps({'qty': qty, 'projectid': projectid })

