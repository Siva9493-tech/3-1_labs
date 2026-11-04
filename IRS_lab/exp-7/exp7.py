import xml.etree.ElementTree as ET
import networkx as nx
import pandas as pd
import matplotlib.pyplot as plt

# ---------------------------------------------------------
# XML DATA
# ---------------------------------------------------------

xml_data = """
<webgraph>

    <page id="A" url="https://example.com/A">
        <title>Artificial Intelligence</title>
        <content>
            Artificial intelligence and machine learning are
            important technologies used in modern systems.
        </content>
        <links>
            <link to="B"/>
            <link to="C"/>
        </links>
    </page>

    <page id="B" url="https://example.com/B">
        <title>Machine Learning</title>
        <content>
            Machine learning algorithms are widely used in
            artificial intelligence and data science.
        </content>
        <links>
            <link to="C"/>
            <link to="D"/>
        </links>
    </page>

    <page id="C" url="https://example.com/C">
        <title>Data Science</title>
        <content>
            Data science uses machine learning for data
            analysis and prediction.
        </content>
        <links>
            <link to="A"/>
            <link to="D"/>
        </links>
    </page>

    <page id="D" url="https://example.com/D">
        <title>Sports</title>
        <content>
            Sports news, sports events and sports analysis
            are discussed on this page.
        </content>
        <links>
            <link to="B"/>
        </links>
    </page>

    <page id="E" url="https://example.com/E">
        <title>Technology</title>
        <content>
            Technology includes computers, software and
            modern information systems.
        </content>
        <links>
            <link to="B"/>
        </links>
    </page>

</webgraph>
"""


# ---------------------------------------------------------
# PARSE XML
# ---------------------------------------------------------

root = ET.fromstring(xml_data)

pages = {}

for page in root.findall("page"):

    pid = page.attrib["id"]
    url = page.attrib["url"]

    title = page.findtext("title", "")
    content = page.findtext("content", "")

    pages[pid] = {
        "title": title,
        "url": url,
        "content": content
    }


# ---------------------------------------------------------
# BUILD WEB GRAPH
# ---------------------------------------------------------

G = nx.DiGraph()

for pid, meta in pages.items():

    G.add_node(
        pid,
        title=meta["title"],
        url=meta["url"],
        content=meta["content"]
    )


for page in root.findall("page"):

    pid = page.attrib["id"]

    for link in page.findall("./links/link"):

        target = link.attrib["to"]

        if target in pages:
            G.add_edge(pid, target)


# ---------------------------------------------------------
# STANDARD PAGERANK
# ---------------------------------------------------------

pageRank = nx.pagerank(
    G,
    alpha=0.85
)


# ---------------------------------------------------------
# TOPIC-SPECIFIC PAGERANK
# ---------------------------------------------------------

topic = "machine learning data"

topic_terms = [
    term.lower()
    for term in topic.split()
]


# Create personalization vector
personalization = {}


for pid, meta in pages.items():

    text = meta["content"].lower()

    score = sum(
        text.count(term)
        for term in topic_terms
    )

    personalization[pid] = score


# Normalize personalization values
total = sum(personalization.values())

if total == 0:

    personalization = {
        pid: 1 / len(pages)
        for pid in pages
    }

else:

    personalization = {
        pid: value / total
        for pid, value in personalization.items()
    }


# Compute Topic-Specific PageRank
tspr = nx.pagerank(
    G,
    alpha=0.85,
    personalization=personalization
)


# ---------------------------------------------------------
# CREATE DATAFRAME
# ---------------------------------------------------------

page_keys = list(pages.keys())

df = pd.DataFrame({

    "Page ID": page_keys,

    "Title": [
        pages[p]["title"]
        for p in page_keys
    ],

    "URL": [
        pages[p]["url"]
        for p in page_keys
    ],

    "PageRank": [
        pageRank[p]
        for p in page_keys
    ],

    "TSPR": [
        tspr[p]
        for p in page_keys
    ]

})


# ---------------------------------------------------------
# DISPLAY RESULTS
# ---------------------------------------------------------

print("\nTopic:", topic)

print("\nPageRank and Topic-Specific PageRank")
print(df.to_string(index=False))


# ---------------------------------------------------------
# WEB GRAPH
# ---------------------------------------------------------

plt.figure(figsize=(8, 6))

pos = nx.spring_layout(
    G,
    seed=42
)

node_sizes = [
    3000 + 12000 * tspr[node]
    for node in G.nodes()
]

nx.draw(
    G,
    pos,
    with_labels=True,
    node_size=node_sizes,
    arrows=True,
    font_size=12
)

plt.title(
    "Web Graph (Node Size and Topic-Specific PageRank)"
)

plt.show()


# ---------------------------------------------------------
# PAGE RANK VS TOPIC-SPECIFIC PAGE RANK
# ---------------------------------------------------------

df_plot = df.set_index("Page ID")[
    ["PageRank", "TSPR"]
]

df_plot.plot(
    kind="bar",
    figsize=(9, 5)
)

plt.title(
    "Comparison: PageRank vs Topic-Specific PageRank"
)

plt.xlabel("Page")

plt.ylabel("Rank")

plt.xticks(rotation=0)

plt.tight_layout()

plt.show()