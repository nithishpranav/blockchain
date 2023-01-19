from flask import Flask, render_template, request
from flask_socketio import SocketIO
from random import random
from threading import Lock
from datetime import datetime
import csv
import time
"""
Background Thread
"""
thread = None
thread_lock = Lock()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'donsky!'
socketio = SocketIO(app, cors_allowed_origins='*')

"""
Get current date time
"""
def get_current_datetime():
    now = datetime.now()
    return now.strftime("%m/%d/%Y %H:%M:%S")

"""
Generate random sequence of dummy sensor values and send it to our clients
"""
def background_thread():
    print("Generating random sensor values")
    while True:
        with open('PdM_telemetry.csv', 'r') as f:
            reader = csv.reader(f)
            for row in reader:
                dummy_sensor_value = round(random() * 100, 3)
                volt_sensor_value = float(row[2])
                rotate_sensor_value = float(row[3])
                pressure_sensor_value = float(row[4])
                vibration_sensor_value = float(row[5])
                socketio.emit('updateSensorData', {
                    'value': dummy_sensor_value,
                    'volt_value':volt_sensor_value,
                    "date": get_current_datetime(),
                    "rotate_value":rotate_sensor_value,
                    "pressure_value":pressure_sensor_value,
                    "vibration_value":vibration_sensor_value
                    })
                socketio.sleep(1)

"""
Serve root index file
"""
@app.route('/')
def index():
    return render_template('index.html')

"""
Decorator for connect
"""
@socketio.on('connect')
def connect():
    global thread
    print('Client connected')

    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(background_thread)

"""
Decorator for disconnect
"""
@socketio.on('disconnect')
def disconnect():
    print('Client disconnected',  request.sid)

if __name__ == '__main__':
    socketio.run(app)