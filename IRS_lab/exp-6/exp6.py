import feedparser
from newspaper import Article
import time
from urllib.parse import quote


def get_links(topic, allowed_sites=None, limit=10):
    """Search Google News and collect candidate news links."""

    if allowed_sites:
        site_query = " OR ".join(
            f"site:{site}" for site in allowed_sites
        )
        search_query = f"{topic} ({site_query})"
    else:
        search_query = topic

    rss_url = (
        "https://news.google.com/rss/search?q="
        + quote(search_query)
        + "&hl=en-IN&gl=IN&ceid=IN:en"
    )

    try:
        feed = feedparser.parse(rss_url)
    except Exception as e:
        print("Error while searching:", e)
        return []

    links = []

    for entry in feed.entries:

        link = entry.get("link")

        if link and link not in links:
            links.append(link)

    return links


def fetch_articles(links, limit):
    """Fetch article titles and links."""

    articles = []

    for link in links:

        if len(articles) >= limit:
            break

        try:
            article = Article(link)

            article.download()
            article.parse()

            if article.title.strip():

                articles.append(
                    (article.title.strip(), link)
                )

                if len(articles) == 1:
                    print(
                        "Collected at least through:",
                        article.title
                    )
                else:
                    print(
                        "Collected:",
                        article.title
                    )

            time.sleep(1)

        except Exception:
            continue

    return articles


if __name__ == "__main__":

    # User input
    topic = input(
        "Enter topic to search for: "
    )

    domains = input(
        "Enter allowed websites "
        "(comma separated) or leave blank for any: "
    )

    if domains:
        allowed = [
            d.strip()
            for d in domains.split(",")
        ]
    else:
        allowed = None

    limit = int(
        input(
            "Enter number of articles to fetch: "
        )
    )

    # Search
    print(
        "\nSearching for:",
        topic
    )

    candidate_links = get_links(
        topic,
        allowed_sites=allowed,
        limit=limit
    )

    print(
        f"Found {len(candidate_links)} candidate links"
    )

    # Fetch articles
    results = fetch_articles(
        candidate_links,
        limit
    )

    print(
        f"Total articles collected: {len(results)}"
    )

    # Display results
    print("\n=== RESULTS ===")

    for i, (title, link) in enumerate(
        results,
        1
    ):
        print(
            f"\n{i}. {title}"
        )

        print(
            link
        )