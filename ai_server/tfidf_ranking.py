import re
from collections import Counter
import math
import nltk
from nltk.corpus import stopwords
import fasttext.util
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')

stop_words = set(stopwords.words('english'))

def description_preprocessing(desc, stop_words):
    pattern = re.compile(r'[^a-zA-Z0-9\s]')
    desc = re.sub(pattern, '', desc)
    words = desc.split()
    filtered_words = [word for word in words if word.lower() not in stop_words]
    return filtered_words

def calculate_tf(description):
    word_count = Counter(description)
    total_words = len(description)
    tf = {word: count / total_words for word, count in word_count.items()}
    return tf

def calculate_idf(corpus):
    N = len(corpus)
    idf = {}
    for desc in corpus:
        for word in set(desc):
            idf[word] = idf.get(word, 0) + 1
    idf = {word: math.log(N / freq) for word, freq in idf.items()}
    return idf

def calculate_tfidf(book_dict):
    tfidf_scores = []
    preprocessed_desc_list = [description_preprocessing(desc, stop_words) for title, desc in book_dict.items()]
    idf = calculate_idf(preprocessed_desc_list)
    for desc in preprocessed_desc_list:
        tf = calculate_tf(desc)
        tfidf = {word: tf[word] * idf.get(word, 0) for word in tf}
        tfidf_scores.append(tfidf)
    return tfidf_scores

def text_embedding(tfidf_scores, book_dict):
    result = {}
    book_titles = list(book_dict.keys())
    ft = fasttext.load_model('cc.en.100.bin')
    first_desc_embedded = np.zeros(ft.get_dimension())
    for i, tfidf in enumerate(tfidf_scores):
        total = np.zeros(ft.get_dimension())
        total_score = 0
        for word, score in tfidf.items():
            total += (np.array(ft[word]) * score)
            total_score += score
        if(i == 0):
            first_desc_embedded = total / total_score
            first_desc_embedded = first_desc_embedded.reshape(1, -1)
        else:
            total /= total_score
            total = total.reshape(1, -1)
            result[book_titles[i]] = float(cosine_similarity(first_desc_embedded, total)[0])

    return result