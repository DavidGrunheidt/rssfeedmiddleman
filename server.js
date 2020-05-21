const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const https = require('https');

const rss_feed = "https://feeds.soundcloud.com/users/soundcloud:users:248666363/sounds.rss"

// app.use(cors({
//   origin: 'https://rssfeeddoidao.herokuapp.com/'
// }));

app.get('/api/rssfeed.rss', (req, res) => {

  https.get(rss_feed, (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      console.log(typeof data)

      res.set('Content-Type', "application/rss+xml;charset=utf-8")
      res.send(data);
    });
  }).on("error", (err) => {
    res.status(404).send(err.message)
  });


});

app.listen(port, () => console.log(`Listening on port ${port}`));