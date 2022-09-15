from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.json_util import dumps

app = Flask(__name__)
mongo = PyMongo(app, uri ="mongodb://mongodb:27017/myDatabase")

@app.route("/add_data", methods=['POST'])
def add_data():
    data = request.get_json()
    mongo.db.users.insert_one(data)
    return 'Done', 201

@app.route("/delete", methods=['DELETE'])
def delete_data():
    mongo.db.users.remove({})
    return 'Deleted', 200

@app.route("/data")
def data():
    datas = mongo.db.users.find()
    return dumps(datas), 200