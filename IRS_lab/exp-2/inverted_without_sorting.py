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

index = {}

for docid in range(1, 11):
    content = documents[docid - 1].lower()
    words = re.findall(r"[a-zA-Z]+", content)

    for word in words:
        if word not in index:
            index[word] = {}

        if docid in index[word]:
            index[word][docid] = index[word][docid] + 1
        else:
            index[word][docid] = 1

print("INVERTED INDEX WITHOUT SORTING")
print()
for word in sorted(index):
    print(word, "->", index[word])

print()
print("COSINE SIMILARITY (INVERTED INDEX WITHOUT SORTING)")
print()
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(documents)

print("Vocabulary:")
print(vectorizer.get_feature_names_out())

print("\nDocument Vectors:")
print(X.toarray())

print("\nCosine Similarity:")
print(cosine_similarity(X))
