from fastapi import FastAPI
from processor import process_value
import serial
import threading
import time

app = FastAPI()

# ------------------------------
# Serial connection (change COM port)
# ------------------------------
try:
    ser = serial.Serial('COM5', 115200, timeout=1)
except Exception as e:
    print("Error opening serial port:", e)
    ser = None

# ------------------------------
# Latest data dictionary
# ------------------------------
latest_data = {
    "value": None,
    "prediction": None,
    "average": None
}

# ------------------------------
# Function to read sensor
# ------------------------------
def read_sensor():
    global latest_data
    while True:
        if ser is None:
            time.sleep(2)
            continue

        try:
            line = ser.readline().decode(errors="ignore").strip()

            # Only parse lines with ":"
            if ":" in line:
                parts = line.split(":")
                if len(parts) == 2:
                    try:
                        value = float(parts[1])
                        # Process value through ML + average
                        prediction, avg = process_value(value)

                        # Update latest_data dictionary
                        latest_data["value"] = value
                        latest_data["prediction"] = float(prediction)
                        latest_data["average"] = float(avg)

                        # Optional: print to console
                        print(f"Value: {value}, Prediction: {prediction}, Average: {avg}")

                    except ValueError:
                        print("Invalid number format:", parts[1])
                else:
                    print("Invalid line format:", line)
            else:
                print("Skipped line (no colon):", line)

        except Exception as e:
            print("Error reading serial:", e)

        time.sleep(0.5)  # small delay to reduce CPU usage

# ------------------------------
# Start background thread
# ------------------------------
threading.Thread(target=read_sensor, daemon=True).start()

# ------------------------------
# FastAPI endpoint
# ------------------------------
@app.get("/data")
def get_data():
    return latest_data