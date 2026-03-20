import serial
import csv

# Open the serial port
ser = serial.Serial('COM5', 115200)
ser.reset_input_buffer()

# Open a CSV file for writing
with open("water_data.csv", "w", newline="") as f:
    writer = csv.writer(f)
    # Write header row
    writer.writerow(["Temperature", "pH", "TDS", "Turb_V", "NTU"])

    print("Listening for Arduino data... Press Ctrl+C to stop.")

    while True:
        line = ser.readline().decode('utf-8', errors='ignore').strip()
        if line:
            print(line)
            try:
                # Split the Arduino line into parts
                parts = line.split("|")
                temp = parts[0].split(":")[1].strip()
                ph   = parts[1].split(":")[1].strip()
                tds  = parts[2].split(":")[1].strip()
                turb = parts[3].split(":")[1].strip()
                ntu  = parts[4].split(":")[1].strip()

                # Save one row into CSV
                writer.writerow([temp, ph, tds, turb, ntu])
            except Exception as e:
                print("Parse error:", e)
