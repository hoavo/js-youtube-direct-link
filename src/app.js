const express = require("express");
var youtubedl = require("youtube-dl");
const app = express();
const port = process.env.PORT || 3000;
app.get("/youtube", (req, res) => {
  const videoId = req.query.id;
  var url = `http://www.youtube.com/watch?v=${videoId}`;
  youtubedl.getInfo(url, [], function(err, info) {
    if (err) throw err;
    const video = { url: info.url };
    res.json(video);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
