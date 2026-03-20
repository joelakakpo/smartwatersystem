import serial

ser = serial.Serial('COM5', 115200)  # change COM port

while True:
    line = ser.readline().decode().strip()
    print(line)