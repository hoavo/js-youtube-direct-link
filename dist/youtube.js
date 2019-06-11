'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var axios = require('axios');
https: //www.youtube.com/get_video_info
function getMp4ForVideo(videoId) {
    var _this = this;

    return new Promise(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
            var videoInfoRequestConfig, responseSchema, videoInfoResponse, dataHtml, start, end, subString, subJson, stringSub, stringSubJson, adaptiveFormats, videoDetails;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            videoInfoRequestConfig = {
                                agent: 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/46.0',
                                headers: {
                                    connection: 'keep-alive'
                                },
                                responseType: 'text'
                            };
                            _context.prev = 1;
                            responseSchema = {};
                            _context.next = 5;
                            return axios.get('https://www.youtube.com/get_video_info?video_id=' + videoId, videoInfoRequestConfig);

                        case 5:
                            videoInfoResponse = _context.sent;
                            dataHtml = videoInfoResponse.data;
                            start = dataHtml.indexOf('ytplayer.config = ') + 18;
                            end = dataHtml.indexOf(';ytplayer.load');
                            subString = dataHtml.substring(start, end);
                            subJson = JSON.parse(subString);
                            stringSub = subJson.args.player_response;
                            stringSubJson = JSON.parse(stringSub);
                            adaptiveFormats = stringSubJson.streamingData.adaptiveFormats;
                            videoDetails = stringSubJson.videoDetails;

                            responseSchema["adaptiveFormats"] = adaptiveFormats;
                            responseSchema["videoDetails"] = videoDetails;
                            resolve(responseSchema);
                            _context.next = 24;
                            break;

                        case 20:
                            _context.prev = 20;
                            _context.t0 = _context['catch'](1);

                            console.log('\n            --- Youtube ---\n            Function: getMp4ForVideo\n            Error: ', _context.t0);
                            reject(_context.t0);

                        case 24:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[1, 20]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
}

getMp4ForVideo("LspZCNNP6aE").then(function (mp4) {
    console.log(mp4);
}).catch(function (e) {
    //
});

//export default {}