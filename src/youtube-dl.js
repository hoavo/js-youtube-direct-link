var youtubedl = require('youtube-dl');
var url = 'http://www.youtube.com/watch?v=YDVAQI-4lto';
// Optional arguments passed to youtube-dl.
var options = [];
youtubedl.getInfo(url, options, function(err, info) {
  if (err) throw err;

//   console.log('id:', info.id);
//   console.log('title:', info.title);
//   console.log('url:', info.url);
//   console.log('thumbnail:', info.thumbnail);
//   console.log('description:', info.description);
//   console.log('filename:', info._filename);
//   console.log('format id:', info.format_id);
console.info('info',info)
});