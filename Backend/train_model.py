from xgboost import XGBClassifier
import numpy as np
import pickle

# Sample training data
X = np.array([
    [50],
    [80],
    [120],
    [200],
    [300]
])

y = np.array([0, 0, 1, 1, 1])

model = XGBClassifier()
model.fit(X, y)

# Save model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model saved successfully!")