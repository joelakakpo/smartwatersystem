from collections import deque
from model import model  # your XGBoost model loaded from model.pkl

# Keep the last 5 values for averaging
last_values = deque(maxlen=5)

def process_value(value):
    """
    Processes a single sensor value:
    - Adds it to the last_values deque
    - Predicts using the XGBoost model
    - Computes the average of the last 5 values
    Returns:
        prediction: int/float (from model)
        avg: float (average of last 5 values)
    """
    # Add new value to deque
    last_values.append(value)

    # Make prediction (model expects 2D array)
    prediction = model.predict([[value]])  # returns array, e.g., [0] or [1]

    # Compute average of last 5 values
    avg = sum(last_values) / len(last_values)

    return int(prediction[0]), avg