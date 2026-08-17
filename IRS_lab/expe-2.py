from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from nltk.stem import PorterStemmer
import re

text_lines = [
    "Natural language processing is a field of artificial intelligence.",
    "It helps computers understand human language and context.",
    "Stop words are common words that usually add little meaning.",
    "Stemming reduces words to their base or root form.",
    "This example includes several lines to demonstrate processing.",
    "The model can analyze text data and remove unnecessary words.",
    "We will show both before and after stop word removal clearly.",
    "Then we will apply stemming to each remaining token.",
    "The output should demonstrate transformation of the text.",
    "Finally we will print results for comparison and learning."
]

original_text = "\n".join(text_lines)

token_pattern = re.compile(r"\b[a-zA-Z]+\b")
all_tokens = token_pattern.findall(original_text.lower())

filtered_tokens = [token for token in all_tokens if token not in ENGLISH_STOP_WORDS]

stemmer = PorterStemmer()
stemmed_tokens = [stemmer.stem(token) for token in filtered_tokens]

print("--- Original Text (10 lines) ---")
print(original_text)
print()

print("--- Before Stop Words Removal: Tokens ---")
print(all_tokens)
print()

print("--- After Stop Words Removal: Tokens ---")
print(filtered_tokens)
print()

print("--- Before Stemming: Tokens After Stop Words Removal ---")
print(filtered_tokens)
print()

print("--- After Stemming: Stemmed Tokens ---")
print(stemmed_tokens)
