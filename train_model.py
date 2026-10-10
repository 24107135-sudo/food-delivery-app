import os
import time

import mlflow
import mlflow.sklearn
import numpy as np
from mlflow.models import infer_signature
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split

tracking_uri = os.getenv("MLFLOW_TRACKING_URI", "http://mlflow:5000")
mlflow.set_tracking_uri(tracking_uri)

for attempt in range(30):
    try:
        mlflow.set_experiment("food-delivery-prep-time")
        break
    except Exception:
        if attempt == 29:
            raise
        time.sleep(2)

rng = np.random.default_rng(42)
orders = rng.integers(1, 21, size=300)
distances = rng.uniform(0, 25, size=300)
features = np.column_stack([orders, distances])
labels = 8 + 2.5 * orders + 1.2 * distances + rng.normal(0, 2, size=300)
train_x, test_x, train_y, test_y = train_test_split(features, labels, test_size=0.2, random_state=42)

with mlflow.start_run(run_name="linear-regression-baseline"):
    mlflow.log_params({"model": "LinearRegression", "test_size": 0.2, "random_state": 42})
    model = LinearRegression().fit(train_x, train_y)
    predictions = model.predict(test_x)
    mlflow.log_metric("mae_minutes", mean_absolute_error(test_y, predictions))
    mlflow.sklearn.log_model(
        model,
        artifact_path="model",
        registered_model_name="FoodDeliveryWaitTime",
        signature=infer_signature(train_x, model.predict(train_x)),
        input_example=[[2, 3.5]],
    )
    print("Trained, tracked, and registered FoodDeliveryWaitTime model.")
