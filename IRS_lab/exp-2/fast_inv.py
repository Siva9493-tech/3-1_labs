import re
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

documents = []
for docid in range(1, 11):
    filename = "document" + str(docid) + ".txt"
    f = open(filename, "r", encoding="utf-8")
    content = f.read()
    f.close()
    documents.append(content)

counts = {}
raw_pairs = []

for docid in range(1, 11):
    content = documents[docid - 1].lower()
    words = re.findall(r"[a-zA-Z]+", content)

    for word in words:
        raw_pairs.append((word, docid))

        if word in counts:
            counts[word] = counts[word] + 1
        else:
            counts[word] = 1

terms = list(counts)

start = {}
position = 0
for word in terms:
    start[word] = position
    position = position + counts[word]

total = 0
for word in terms:
    total = total + counts[word]

big_list = [0] * total

next_place = {}
for word in terms:
    next_place[word] = start[word]

for word, docid in raw_pairs:
    slot = next_place[word]
    big_list[slot] = docid
    next_place[word] = slot + 1

print("FAST-INV ALGORITHM (NO SORTING)")
print()
for word in terms:
    count = counts[word]
    begin = start[word]
    postings = big_list[begin : begin + count]
    print(word, "->", postings)

print()
print("COSINE SIMILARITY (FAST-INV ALGORITHM)")
print()
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(documents)

print("Vocabulary:")
print(vectorizer.get_feature_names_out())

print("\nDocument Vectors:")
print(X.toarray())

print("\nCosine Similarity:")
print(cosine_similarity(X))
