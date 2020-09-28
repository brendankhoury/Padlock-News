import pymongo						## For connecting to MongoDB database
import newspaper					## For getting article links off of news sites (has NLP capabilities)
from newsplease import NewsPlease 	## For parsing articles from homepage of website
import json

if __name__ == "__main__":

	# Connect to primary MongoDB database
	client = pymongo.MongoClient("mongodb+srv://zw1623:<password>@newscluster.po4ut.mongodb.net/<dbname>?retryWrites=true&w=majority")
	db = client["newssite_test"]
	col = db["articles"]

	# Scrape data from random news site
	sample_paper = newspaper.build("https://www.bbc.com/news")

	# Extract and store articles from news site
	extracted_articles = []
	for url in sample_paper.article_urls():
		article = NewsPlease.from_url(url)
		extracted_articles.append(article)

	# Test database insertion
	if (not extracted_articles):
		inserted = col.insert_one(extracted_articles[0].__dict__)