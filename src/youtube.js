const axios = require("axios");
const queryString = require("query-string");

function getMp4ForVideo(videoId) {
  return new Promise(async (resolve, reject) => {
    const videoInfoRequestConfig = {
      agent:
        "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/46.0",
      headers: {
        connection: "keep-alive"
      },
      responseType: "text"
    };
    try {
      let responseSchema = {};

      const url = `https://www.youtube.com/get_video_info?el=embedded&video_id=${videoId}`;
      const videoInfoResponse = await axios.get(url, videoInfoRequestConfig);
      console.info("url", url);
      const info = queryString.parse(videoInfoResponse.data);
      const streamMap = info["url_encoded_fmt_stream_map"].split(",");
      const playerResponse = info["player_response"];
      const adaptiveFormats = info["adaptive_fmts"];
      console.info("streamMap", streamMap.length, streamMap);
      streamMap.map(item => {
        const data = queryString.parse(item);
        const scrambledSignature = data["s"];
        const spParam = data["sp"];
        console.info("scrambledSignature", scrambledSignature);
      });
      const url2 = `http://www.youtube.com/watch?v=${videoId}`;
      const videoInfoResponse2 = await axios.get(url2, videoInfoRequestConfig);
      const dataHtml = videoInfoResponse2.data;
      const start = dataHtml.indexOf("ytplayer.config = ") + 18;
      const end = dataHtml.indexOf(";ytplayer.load");
      const subString = dataHtml.substring(start, end);

      const subJson = JSON.parse(subString);
      const linkJs =  subJson.assets.js
      const streamMap2 = subJson.args["url_encoded_fmt_stream_map"].split(",");
      console.info('linkJs',linkJs, streamMap2)
      const videoInfoResponse3 = await axios.get('https://www.youtube.com'+linkJs, videoInfoRequestConfig);
      const dataHtml3 = videoInfoResponse3.data;
      var re = /^\w\w=(.*)(a.join\(""\)};)/gm;
      var myArray = dataHtml3.match(re).join("");
      const funcnam = myArray.split("=")[0]
      const re2 = /(;var jv=)(.*)()/gm;
      var myArray2 = dataHtml3.match(re2);
      
      console.info('myArray', myArray, myArray2)
      // const stringSub = queryString.parse(subJson.args.adaptive_fmts);
      // console.info('stringSub', stringSub)
      // const stringSubJson = JSON.parse(stringSub);
      // const adaptiveFormats = stringSubJson.streamingData.adaptiveFormats;
      // const videoDetails = stringSubJson.videoDetails
      // responseSchema["adaptiveFormats"] = adaptiveFormats;
      // responseSchema["videoDetails"] = videoDetails;
      // resolve(responseSchema)
    } catch (err) {
      console.log(
        `
            --- Youtube ---
            Function: getMp4ForVideo
            Error: `,
        err
      );
      reject(err);
    }
  });
}

getMp4ForVideo("dmQXVxBAFDU")
  .then(mp4 => {
    console.log(mp4);
  })
  .catch(e => {
    console.info("fail", e);
  });
// var $z={yh:function(a){a.reverse()},
// Np:function(a,b){a.splice(0,b)},
// TY:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c}};
// aA=function(a){a=a.split("");$z.TY(a,40);$z.TY(a,67);$z.yh(a,1);$z.TY(a,7);$z.Np(a,1);return a.join("")};
// var jv={yh:function(a){a.reverse()},
// Np:function(a,b){a.splice(0,b)},
// TY:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b%a.length]=c}};
// kv=function(a){a=a.split("");jv.TY(a,40);jv.TY(a,67);jv.yh(a,1);jv.TY(a,7);jv.Np(a,1);return a.join("")};
// console.info('hoa()', kv('l=Q9XoYa6YTVIaZ2Nb3o6EwWzmgKvea1f2Vvo3YnqdpsnBiAGrri7EvtAqP8jcdLabZ=gMmOizZwBmryYmATFI5eAlNAhIQRwA2IxgLAw'))
