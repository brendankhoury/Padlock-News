# API

The description of what each call does is below: 

## Get the feed of all the articles

### Request 
Get /api/feedAll/
http://localhost:3000/api/feedAll

### Response
Returns a list of all the articles with the corresponding ids, descriptions, image urls, and titles. 

## Get the recent five articles

### Request
Get /api/recentarticles/ 
http://localhost:3000/api/recentarticles

### Response
Returns the "Recent News" category that includes the category info and recent five articles with their corresponding titles, ids, image_urls, descriptions and maintexts. 

## Get an article based on its id

### Request
GET /api/article/:id/
http://localhost:3000/api/article/5f8356d287e3b8b46b7f105d

### Response
Returns all the information of a specific article based on its id. 

## Get the search result based on the keywords

### Request
GET /api/search/
http://localhost:3000/api/search/?keywords=milk,dairy

### Response
Returns a list of all the articles that match with any of the keywords given. 
