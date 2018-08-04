# RESTful movie database in node.js

This repository contains a simple **REST** Api for movie information written in **Node.js**

##Usage
simply clone the repo and navigate to the root directory, from there simply execute:

`npm install` 

followed by 

`npm start`. The server should be up and running on your local machine on port `3000`.

## Requests
There are two addresses available, `/movies` and `/comments`.

`GET` request to either of two returns list of all present movies or comments in the database

For example, `GET` request to `localhost:3000/movies` will return

```$xslt
{
    "count": 2,
    "products": [
        {
            "_id": "5b6576a45853551af823f630",
            "Title": "Fast and Furious",
            "Year": 1939,
            "Director": "Busby Berkeley",
            "Actors": "Franchot Tone, Ann Sothern, Ruth Hussey, Lee Bowman",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/movies/5b6576a45853551af823f630"
            }
        },
        {
            "_id": "5b6576bedb67f000204f2292",
            "Title": "Fast and Furious",
            "Year": 1939,
            "Director": "Busby Berkeley",
            "Actors": "Franchot Tone, Ann Sothern, Ruth Hussey, Lee Bowman",
            "request": {
                "type": "GET",
                "url": "http://localhost:3000/movies/5b6576bedb67f000204f2292"
            }
        }
    ]
}
```
Each individual movie can be viewed by its corresponding **_id**

`POST` request should be performed with specific **JSON** bodies:

```
{ 
   "Title": "Equalizer"
   }
```

to `localhost:3000/movies`  will fetch the Equalizer movie data from external API, save the movie to the database,
 and return the result to the client

`POST` to `/comments` needs the **_id** of the movie we want to comment. From previous result of movies lets take 
Fast and Furious with movie **_id** of 5b6576a45853551af823f630 and comment on it: 

```$xslt
{
    "movieId": "5b6576a45853551af823f630",
    "comment": "Very entertaining movie"
}
```

This operation will correlate new comment with existing movie, and return the comment to the client

**Comments** can also be sorted by movieId, by simply navigating to `localhost:3000/comments/movieId`

##Database

MongoDb Atlas is used as a cloud-provided database.