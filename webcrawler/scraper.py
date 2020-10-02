import pymongo						## For connecting to MongoDB database
import newspaper					## For getting article links off of news sites (has NLP capabilities)
import argparse
import sys ## temporary
import urllib.parse
#from newsplease import NewsPlease 	## For parsing articles from homepage of website

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
	homepage = newspaper.build(site, memoize_articles=False)

	# Download and parse articles
	downloaded_articles = []
	for i in range(0, len(homepage.articles)):
		dl_article = homepage.articles[i]
		print(dl_article.url)
		dl_article.download()
		dl_article.parse()		
		downloaded_articles.append(dl_article)

	print(downloaded_articles[0].__dict__)

	# Test database insertion (FIX)
	# if (extracted_articles):
	# 	print("Inserting...")
	# 	inserted = col.insert_one(extracted_articles[0].__dict__)