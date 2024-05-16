from flask import Flask, jsonify, make_response, request
from flask_cors import CORS, cross_origin

from tfidf_ranking import calculate_tfidf, text_embedding
from collections import OrderedDict
import json

import firebase_admin
from firebase_admin import credentials, firestore

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['POST'])
@cross_origin()
def get_similar_books():
    data = request.json
    user_prompt = data['user_prompt']
    print(f"User prompt: {user_prompt}")

    book_dict_and_prompt = OrderedDict([("user_prompt", user_prompt)] + list(book_dict.items()))

    tfidf_scores = calculate_tfidf(book_dict_and_prompt)
    scores = text_embedding(tfidf_scores=tfidf_scores, book_dict=book_dict_and_prompt)
    result = get_best_books(scores)
    
    return make_response(jsonify(result), 200)

def get_data_from_db(path_to_json):
    #Get data from Firestore
    cred = credentials.Certificate(path_to_json)
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    docs = db.collection('books').stream()
    book_dict = {}
    for doc in docs:
        doc_dict = doc.to_dict()
        book_dict[doc.id] = doc_dict.get('description')

    return book_dict

def get_best_books(scores):
    sorted_scores = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    print(sorted_scores)
    return json.dumps(sorted_scores[:5])

book_dict = get_data_from_db("lexis-18c6c-firebase-adminsdk-ui60s-64c548d4c8.json")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3005)

get_data_from_db("lexis-18c6c-firebase-adminsdk-ui60s-64c548d4c8.json")