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
    N = len(preprocessed_desc_list)
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
            result[book_titles[i]] = cosine_similarity(first_desc_embedded, total)

    return result

# Example usage
desc_list = [
    "A story about the space and adventure",
    "The Laconian Empire has fallen, setting the thirteen hundred solar systems free from the rule of Winston Duarte. But the ancient enemy that killed the gate builders is awake, and the war against our universe has begun again. In the dead system of Adro, Elvi Okoye leads a desperate scientific mission to understand what the gate builders were and what destroyed them, even if it means compromising herself and the half-alien children who bear the weight of her investigation. Through the wide-flung systems of humanity, Colonel Aliana Tanaka hunts for Duarte's missing daughter. . . and the shattered emperor himself. And on the Rocinante, James Holden and his crew struggle to build a future for humanity out of the shards and ruins of all that has come before. As nearly unimaginable forces prepare to annihilate all human life, Holden and a group of unlikely allies discover a last, desperate chance to unite all of humanity, with the promise of a vast galactic civilization free from wars, factions, lies, and secrets if they win.",
    "Follows the adventures of Paul Atreides, the son of a betrayed duke given up for dead on a treacherous desert planet and adopted by its fierce, nomadic people, who help him unravel his most unexpected destiny."
]

book_dict = {
    "1": "A story about the space and adventure",
    "2": "Rosemary Harper doesn't expect much when she joins the crew of the aging Wayfarer. While the patched-up ship has seen better days, it offers her a bed, a chance to explore the far-off corners of the galaxy, and most importantly, some distance from her past. An introspective young woman, she's never met anyone remotely like the ship's diverse crew, including Sissix, the exotic reptilian pilot, chatty engineers Kizzy and Jenks, who keep the ship running, and Ashby, their noble captain. Life aboard the Wayfarer is chaotic and crazy-exactly what Rosemary wants. It's also about to get extremely dangerous when the crew is offered the job of a lifetime. Tunneling wormholes through space to a distant planet is definitely lucrative and will keep them comfortable for years. But risking her life wasn't part of the plan. In the far reaches of deep space, the tiny Wayfarer crew will confront a host of unexpected mishaps and thrilling adventures that force them to depend on each other. To survive, Rosemary's got to learn how to rely on this assortment of oddballs-an experience that teaches her about love and trust, and that having a family isn't necessarily the worst thing in the universe.",
    "3": "The Laconian Empire has fallen, setting the thirteen hundred solar systems free from the rule of Winston Duarte. But the ancient enemy that killed the gate builders is awake, and the war against our universe has begun again. In the dead system of Adro, Elvi Okoye leads a desperate scientific mission to understand what the gate builders were and what destroyed them, even if it means compromising herself and the half-alien children who bear the weight of her investigation. Through the wide-flung systems of humanity, Colonel Aliana Tanaka hunts for Duarte's missing daughter. . . and the shattered emperor himself. And on the Rocinante, James Holden and his crew struggle to build a future for humanity out of the shards and ruins of all that has come before. As nearly unimaginable forces prepare to annihilate all human life, Holden and a group of unlikely allies discover a last, desperate chance to unite all of humanity, with the promise of a vast galactic civilization free from wars, factions, lies, and secrets if they win.",
}

print(calculate_tfidf(desc_list));