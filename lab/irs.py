
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics import confusion_matrix
import numpy as np

categories = [
    'comp.graphics',
    'rec.sport.baseball',
    'sci.space'
]

data = fetch_20newsgroups(
    subset='all', categories=categories,
    remove=('headers', 'footers', 'quotes')
)

X = TfidfVectorizer(
    stop_words='english', max_df=0.5
).fit_transform(data.data)

k = len(categories)
model = KMeans(n_clusters=k, random_state=42, n_init=10)
clusters = model.fit_predict(X)

cm = confusion_matrix(data.target, clusters)
purity = np.sum(np.max(cm, axis=0)) / np.sum(cm)

precision, recall, f1 = [], [], []

for i in range(k):
    tp = np.max(cm[:, i])
    fp = np.sum(cm[:, i]) - tp
    fn = np.sum(cm) - np.sum(cm[:, i]) - \
         np.sum(cm[np.argmax(cm[:, i]), :]) + tp

    p = tp / (tp + fp) if tp + fp else 0
    r = tp / (tp + fn) if tp + fn else 0
    f = 2 * p * r / (p + r) if p + r else 0

    precision.append(p)
    recall.append(r)
    f1.append(f)

print("Total Documents:", len(data.data))
print("Categories:", categories)
print("Purity:", round(purity, 4))
print("Precision:", round(np.mean(precision), 4))
print("Recall:", round(np.mean(recall), 4))
print("F-Measure:", round(np.mean(f1), 4))
print("Confusion Matrix:\n", cm)