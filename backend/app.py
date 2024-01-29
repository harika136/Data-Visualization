from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
import pandas as pd
import numpy as np
import json
from scipy import stats
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# MongoDB configuration
mongo_client = MongoClient('mongodb://localhost:27017')

db = mongo_client['Aug_Task_K_Hub']
collection = db['Practice react app']
dp = pd.read_csv("Statistics.csv")

# Convert the DataFrame to a list of dictionaries
data_to_insert = dp.to_dict(orient='records')

# Insert the data into the MongoDB collection
collection.insert_many(data_to_insert)

def convert_int32_to_int(data):
    for key, value in data.items():
        if isinstance(value, int) and value >= 2147483647:
            data[key] = int(value)
    return data
def json_default_handler(o):
    if isinstance(o, ObjectId):
        return str(o)
    if isinstance(o, int) and o >= 2147483647:
        return int(o)


@app.route('/api/stats', methods=['GET'])
def get_statistics():
    
    data = list(collection.find())

    
    gpa = [student['gpa'] for student in data]
    studyweek = [student['studyweek'] for student in data]
    sleepnight = [student['sleepnight'] for student in data]
    out = [student['out'] for student in data]
    
    
    stats_data = {
        'Mean': {
            'gpa': np.mean(gpa),
            'studyweek': np.mean(studyweek),
            'sleepnight': np.mean(sleepnight),
            'out': np.mean(out),
           },
        'Median': {
            'gpa': np.median(gpa),
            'studyweek': np.median(studyweek),
            'sleepnight': np.median(sleepnight),
            'out': np.median(out),
    
        },
        'Minimum': {
            'gpa': min(gpa),
            'studyweek': min(studyweek),
            'sleepnight': min(sleepnight),
            'out': min(out)   },
        'Varience': {
            'gpa': np.var(gpa),
            'studyweek': np.var(studyweek),
            'sleepnight': np.var(sleepnight),
            'out': np.var(out),
      },
        'Standard Deviation':{
            'gpa': np.std(gpa),
            'studyweek': np.std(studyweek),
            'sleepnight': np.std(sleepnight),
            'out': np.std(out),
      },
        'Maximum':{
            'gpa': max(gpa),
            'studyweek': max(studyweek),
            'sleepnight': max(sleepnight),
            'out': max(out)    }
    }
    
    stats_data = convert_int32_to_int(stats_data)
    
    return json.dumps(stats_data, default=json_default_handler)


if __name__ == '__main__':
    app.run(debug=True,port= 5000)
