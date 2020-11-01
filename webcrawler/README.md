# webcrawler

## Summary
Basic webcrawler script that can scrape articles from news sites and insert them into our MongoDB database.

## Requirements
See the ```requirements.txt``` file for all dependencies that can be installed using ```pip```. (File generated using ```pipreqs```)

## How To Run
0. Make sure all dependencies are installed on your machine.
1. Store your MongoDB database credentials in environment variables using the following commands:
	* For username: ```export DB_USR=your_username```
	* For password: ```export DB_PWD=your_password```
2. Modify the ```sites.txt``` file so it contains the news sites you'd like to scrape. Make sure to follow the formatting for URLs shown in the file.
3. Run the script from your terminal: ```python scraper.py```

## Used Libraries
These are the repositories for some of the libraries used to create this webcrawler:
* news-please: https://github.com/fhamborg/news-please
* pymongo: https://github.com/mongodb/mongo-python-driver
* newspaper: https://github.com/codelucas/newspaper
* ntlk: https://github.com/nltk/nltk