import pymongo						# For connecting to MongoDB database
import newspaper					# For getting article links off of news sites
from newsplease import NewsPlease 	# For parsing articles from homepage of website
import urllib.parse
from urllib.error import HTTPError
import argparse
import sys # DEBUG (replace with argparse)

if __name__ == "__main__":

	# Process commandline arguments
	#parser = argparse.ArgumentParser(description='Scrape articles from a given news site')
	#parser.add_argument
	username = sys.argv[1]
	password = sys.argv[2]
	site = sys.argv[3]

	# Connect to MongoDB database
	username = urllib.parse.quote_plus(username)
	password = urllib.parse.quote_plus(password)
	database = urllib.parse.quote_plus('newssite_test')

	client = pymongo.MongoClient("mongodb+srv://%s:%s@newscluster.po4ut.mongodb.net/%s?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE" % (username, password, database))
	db = client.newssite_test
	col = db.articles

	# Scrape data from random news site
	homepage = newspaper.build(site, memoize_articles=True)	# DEBUG (set to true to avoid duplicates)

	# Download and parse articles
	parsed_articles = []
	for i in range(0, len(homepage.articles)):
		try:
			article = NewsPlease.from_url(homepage.articles[i].url)
		except HTTPError as e:	# If there is an issue downloading an article, skip it
			continue

		print(article.url) # DEBUG
		parsed_articles.append(article.__dict__)

	# Insert articles into database
	if (parsed_articles):
		print("Inserting...") #DEBUG
		inserted = col.insert_many(parsed_articles)
