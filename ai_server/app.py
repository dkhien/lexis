import copy
import json
import time
from threading import Thread
import socket

import requests
from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin

from tfidf_ranking import calculate_tfidf, text_embedding

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['POST'])
@cross_origin()
def get_similar_books():
    data = request.json
    user_prompt = data['user_prompt']
    print(f"User prompt: {user_prompt}")
    # tfidf_scores = calculate_tfidf(desc_list)
    # text_embedding(tfidf_scores=tfidf_scores)

    return make_response(jsonify(data), 200)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3005)
