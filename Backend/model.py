import pickle
import os

current_dir = os.path.dirname(__file__)
model_path = os.path.join(current_dir, "model.pkl")

with open(model_path, "rb") as f:
    model = pickle.load(f)