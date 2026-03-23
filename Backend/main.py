from fastapi import FastAPI
from  processor import process_value
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

            # Split by pipe into key:value pairs
            parts = line.split("|")
            data = {}
            for part in parts:
                part = part.strip()
                if ":" in part:
                    key, value = part.split(":", 1)
                    data[key.strip()] = value.strip()

            # Check if all required fields are present
            required = ["T", "pH", "TDS", "V_T", "NTU"]
            if all(field in data for field in required):
                try:
                    temp = float(data["T"])
                    ph = float(data["pH"])
                    tds = float(data["TDS"])
                    vt = float(data["V_T"])
                    ntu = float(data["NTU"])

                    # Define safe ranges (example thresholds)
                    safe_temp = temp < 35
                    safe_ph = 6.5 <= ph <= 8.5
                    safe_tds = tds < 500
                    safe_vt = vt < 5
                    safe_ntu = ntu < 1000

                    if all([safe_temp, safe_ph, safe_tds, safe_vt, safe_ntu]):
                        prediction = "Safe"
                    else:
                        prediction = "Unsafe"

                    # Update latest_data
                    latest_data["temperature"] = temp
                    latest_data["pH"] = ph
                    latest_data["TDS"] = tds
                    latest_data["V_T"] = vt
                    latest_data["NTU"] = ntu
                    latest_data["prediction"] = prediction

                    # Print values + Safe/Unsafe
                    print(f"T={temp}, pH={ph}, TDS={tds}, V_T={vt}, NTU={ntu}")
                    print(f"Prediction: {prediction}")
                except ValueError:
                    print("Invalid number format in:", data)
            else:
                print("Line parsed but missing required fields:", data)

        except Exception as e:
            print("Error reading serial:", e)

        time.sleep(0.5)


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