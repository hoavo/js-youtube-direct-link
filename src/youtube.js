const axios = require('axios');
const queryString = require('query-string');

function getMp4ForVideo(videoId) {
    return new Promise(async(resolve, reject) => {
        const videoInfoRequestConfig = {
            agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/46.0',
            headers: {
                connection: 'keep-alive',
            },
            responseType: 'text'        
        }
        try {
            let responseSchema = {};
           
            const url = `https://www.youtube.com/get_video_info?el=detailpage&hl=en&ps=default&video_id=${videoId}`
            const videoInfoResponse = await axios.get(url, videoInfoRequestConfig)
          console.info('url',url)
            const info = queryString.parse(videoInfoResponse.data)
            console.info(info)
            const streamMap = info["url_encoded_fmt_stream_map"].split(',');
            const playerResponse = info["player_response"];
            const adaptiveFormats = info["adaptive_fmts"]
            console.info('streamMap',streamMap.length,streamMap)
            streamMap.map(item=> {
                const data = queryString.parse(item)
                const scrambledSignature = data['s']
                const spParam = data['sp']
                console.info('data',data)
            })
            // const dataHtml = videoInfoResponse.data;
            // const start = dataHtml.indexOf('ytplayer.config = ') + 18;
            // const end = dataHtml.indexOf(';ytplayer.load');
            // const subString = dataHtml.substring(start, end)
            // const subJson = JSON.parse(subString);
            // const stringSub = subJson.args.player_response;
            // const stringSubJson = JSON.parse(stringSub);
            // const adaptiveFormats = stringSubJson.streamingData.adaptiveFormats;
            // const videoDetails = stringSubJson.videoDetails
            // responseSchema["adaptiveFormats"] = adaptiveFormats;
            // responseSchema["videoDetails"] = videoDetails;
            // resolve(responseSchema)
        }
        catch (err) {
            console.log(`
            --- Youtube ---
            Function: getMp4ForVideo
            Error: `, err)
            reject(err)
        }
    })
} 

 getMp4ForVideo("6v2L2UGZJAM").then((mp4) => {
    console.log(mp4);
}).catch(e => {
    //
});

//export default {}