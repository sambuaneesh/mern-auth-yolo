from flask import Flask, request, jsonify
import cv2
import torch
from yolov5.utils.torch_utils import select_device
# from yolov5.utils.google_utils import gdrive_download
from yolov5.models.experimental import attempt_load
import numpy as np

app = Flask(__name__)

# Set device
device = select_device("cpu")

# Download model weights
# gdrive_download("1s9sEiTBBTgTZT8_HGwL-nBvksVbDLuFp", "yolov5s.pt")

# Load model
# model = attempt_load("model.pt", map_location=device)
model = attempt_load("model.pt")

@app.route('/predict', methods=['POST'])
def predict():
    # Get image from request
    image = request.files['image']
    image = cv2.imdecode(np.fromstring(image.read(), np.uint8), cv2.IMREAD_UNCHANGED)

    # Run object detection
    predictions = model(image, device=device)

    # Process output
    results = []
    for prediction in predictions:
        x1, y1, x2, y2, conf, cls_conf, cls_pred = prediction
        results.append({
            'label': cls_pred,
            'confidence': conf * cls_conf
        })

    return jsonify({'predictions': results})

if __name__ == '__main__':
    app.run()

