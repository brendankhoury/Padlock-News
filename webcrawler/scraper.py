import pymongo						# For connecting to MongoDB database
import newspaper					# For getting article links off of news sites
from newsplease import NewsPlease 	# For parsing articles from homepage of website
import nltk							# For initial natural language parsing
import urllib.parse
from urllib.error import HTTPError
import argparse

if __name__ == "__main__":

	# Process command-line arguments
	parser = argparse.ArgumentParser(prog='scraper.py', description='Scrape articles from a given news site')
	parser.add_argument('username', help='Username for MongoDB database access')
	parser.add_argument('password', help='Password for MongoDB database access')
	parser.add_argument('site_url', help='URL to news site homepage for scraping')
	args = parser.parse_args()

	# Connect to MongoDB database
	username = urllib.parse.quote_plus(args.username)
	password = urllib.parse.quote_plus(args.password)
	database = urllib.parse.quote_plus('newssite_test') # DEBUG (testing database)

	print("DEBUG: Connecting to database...")	#DEBUG
	client = pymongo.MongoClient("mongodb+srv://%s:%s@newscluster.po4ut.mongodb.net/%s?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE" % (username, password, database))
	db = client.newssite_test
	col = db.articles

	# Scrape data from random news site
	print("DEBUG: Scraping homepage...")	#DEBUG
	homepage = newspaper.build(args.site_url, memoize_articles=True)	# DEBUG (set to true to avoid duplicates)

	# Loop to download and parse articles
	finished = False
	tries = 0	# Limit number of re-download tries
	not_downloaded = homepage.article_urls()
	error_urls = []
	parsed_articles = []
	print("DEBUG: Downloading articles...") # DEBUG
	while (not finished and tries < 5):
		for i in range(0, len(not_downloaded)):
			try:
				if ("http://" in not_downloaded[i]):	# Skip articles with non-HTTPS URLs
					continue
				article = NewsPlease.from_url(not_downloaded[i])
			except HTTPError as e:	# If there is an issue downloading an article, store it for later
				error_urls.append(not_downloaded)

			print("\t" + article.url) # DEBUG
			parsed_articles.append(article.__dict__)

		# If no articles had issues downloading
		if (not error_urls):
			finished = True
		else: # Otherwise swap URL lists and try to download again
			not_downloaded = error_urls
			error_urls = []
			tries += 1

	# Extract keywords from each article based on word frequency
	print("DEBUG: Extracting keywords...")
	for article in parsed_articles:
		# Split aricle maintext to remove stopwords
		tokens = [t for t in article["maintext"].split()]
		clean_tokens = tokens[:]
		sw = nltk.corpus.stopwords.words("english")
		for token in tokens:
			if (token.lower() in sw):
				clean_tokens.remove(token)
		
		# Find frequency of each word
		freq_pairs = []
		freq = nltk.FreqDist(clean_tokens)
		for key,val in freq.items():
			freq_pairs.append((str(key), int(val)))
		freq_pairs.sort(key=lambda tup: tup[1], reverse=True)

		# Add 5 most frequent words to keywords
		article["keywords"] = []
		for i in range(0,5):
			article["keywords"].append(freq_pairs[i][0])

	# Get stripped version of news site base URL
	stripped_url = args.site_url.replace("https://", "")
	stripped_url = stripped_url.replace("www.", "")
	stripped_url = stripped_url.replace('/','')

	# Parse categories for articles based on URLs
	print("DEBUG: Parsing categories...")
	categories = []
	for url in homepage.category_urls():
		category = url
		category = category.replace(args.site_url, "")	# Remove base URL
		category = category.replace("https://", "")	# Remove HTTP string
		category = category.replace("http://", "")
		category = category.replace("www.", "")	# Remove www string
		category = category.replace(stripped_url, "")	# Remove stripped base URL
		category = category.replace('/','')
		category = category.replace('.','')
		if (category != "" and category != 'news'):
			categories.append(category)
	categories = list(dict.fromkeys(categories))	# Remove dupicate entries

	# Label category for each article
	for article in parsed_articles:
		article['category'] = []
		for category in categories:
			if (category in parsed_articles["url"]):
				article['category'].append(category)

	# Insert articles into database
	if (parsed_articles):
		print("DEBUG: Inserting articles...") # DEBUG
		inserted = col.insert_many(parsed_articles)

'''
 DEBUG NOTES:
 - News site URLs currently must be in "https://www. ..." format for parsing to work correctly
 - Might be some garbage in the categories list from improper parsing
 '''