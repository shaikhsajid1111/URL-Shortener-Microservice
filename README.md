<h1>Elfinsurl</h1>
<p>elfinsurl is a free and open source URL shortener built with javascript </p>

<h2>Usage:</h2>

To short a URL , make a JSON POST request to ``` www.elfinsurl.tk/new ```


Request JSON should like:
```json
{
    "url":"Your long url"
}
```

 Using CURL:
 ```bash
 curl -X POST -H 'Content-Type: application/json' -i 'http://www.elfinsurl.tk/new' --data '{
"url" : "Your long url goes here"
}'
```
Response:
```javascript
{
  "original_url": "Your long url",
  "short_url": "elfinsurl.tk/shortcode" //your short url
}

```

To use that short url just open it in browser and done!.


<h2> Tech: </h2>
<ul>
<li>
<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>
</li>
<li>
<a href="https://mongoosejs.com/" target="_blank">Mongoose</a>
</li>
<li>
<a href="https://nodejs.org/" target="_blank">Node.js</a>
</li>
</ul>

<br>
<br>

<b>Note: Short URL will last for only 6 months period</b>



<h2> LICENSE: </h2>
MIT