import os

import mlflow
import mlflow.pyfunc
from flask import Flask, jsonify, request
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Histogram, generate_latest

app = Flask(__name__)
mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://mlflow:5000"))
REQUESTS = Counter("food_delivery_predictions_total", "Prediction requests", ["result"])
LATENCY = Histogram("food_delivery_prediction_seconds", "Prediction endpoint latency")
MODEL = None


def load_model():
    global MODEL
    if MODEL is None:
        MODEL = mlflow.pyfunc.load_model("models:/FoodDeliveryWaitTime/1")
    return MODEL


@app.get("/health")
def health():
    return jsonify(status="ok")


@app.get("/metrics")
def metrics():
    return generate_latest(), 200, {"Content-Type": CONTENT_TYPE_LATEST}


@app.post("/predict")
@LATENCY.time()
def predict():
    values = request.get_json(silent=True)
    if not isinstance(values, dict):
        REQUESTS.labels(result="invalid").inc()
        return jsonify(error="Send JSON with order_size and distance_km"), 400
    try:
        order_size = float(values["order_size"])
        distance = float(values["distance_km"])
        if not 1 <= order_size <= 20 or not 0 <= distance <= 50:
            raise ValueError
        prediction = float(load_model().predict([[order_size, distance]])[0])
    except (KeyError, TypeError, ValueError):
        REQUESTS.labels(result="invalid").inc()
        return jsonify(error="order_size must be 1-20 and distance_km must be 0-50"), 400
    REQUESTS.labels(result="success").inc()
    return jsonify(estimated_prep_minutes=round(max(5, prediction), 1))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
