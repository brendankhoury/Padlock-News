import pymongo						## For connecting to MongoDB database
import newspaper					## For getting article links off of news sites (has NLP capabilities)
from newsplease import NewsPlease 	## For parsing articles from homepage of website
import urllib.parse

if __name__ == "__main__":

	# Connect to MongoDB database
	username = urllib.parse.quote_plus(input("Database username: "))
	password = urllib.parse.quote_plus(input("Database password: "))
	database = urllib.parse.quote_plus('newssite_test')

	client = pymongo.MongoClient("mongodb+srv://%s:%s@newscluster.po4ut.mongodb.net/%s?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE" % (username, password, database))
	db = client.newssite_test
	col = db.articles

	# Scrape data from random news site
	site = input("Specify news site url to scrape: ")
	sample_paper = newspaper.build(site)

	# Extract and store articles from news site
	extracted_articles = []
	for url in sample_paper.article_urls():
		article = NewsPlease.from_url(url)
		extracted_articles.append(article)

	# Test database insertion (FIX)
	if (extracted_articles):
		print("Inserting...")
		inserted = col.insert_one(extracted_articles[0].__dict__)