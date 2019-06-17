const express = require("express");
var youtubedl = require("youtube-dl");
const app = express();
const port = process.env.PORT || 3000;
app.get("/youtube", (req, res) => {
  const videoId = req.query.id;
  var url = `http://www.youtube.com/watch?v=${videoId}`;
  try {
    youtubedl.getInfo(url, [], function(err, info) {
      if (err) throw err;
      const videos = info.formats
        ? info.formats.filter(item => item.ext === "mp4")
        : [];
      const video = { success: true, url: info.url, videos };
      res.json(video);
    });
  } catch (error) {
    res.json({ success: false });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
