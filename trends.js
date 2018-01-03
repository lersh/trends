'use strict'
const googleTrends = require('google-trends-api');

class Trends {

    constructor(keywords, startTime, endTime, geo) {
        this.params = {};
        this.params.keyword = keywords;
        this.params.startTime = startTime;
        this.params.endTime = endTime;
        this.params.granularTimeResolution = true;
        this.params.hl='zh-CN';
        this.params.geo = geo;
    }

    async getJson() {
        var result;
        try {
            result = await googleTrends.interestOverTime(this.params);
            return JSON.parse(result);
        }
        catch (error) {
            console.error(error);
        }
    }

    async getTrends() {
        var result;
        try {
            result = await googleTrends.interestOverTime(this.params);
            var jsonResult = JSON.parse(result);
            var timelineData = jsonResult.default.timelineData;
            var string = '时间    ' + this.params.keyword.join('    ') + '<br>\r\n';
            for (var n in timelineData) {
                string += new Date(timelineData[n].time * 1000).toLocaleString() + '  ' + timelineData[n].value.join(' ') + '<br>\r\n';
            }
            return string;
        }
        catch (error) {
            console.error(error);
        }
    }
}

module.exports = Trends;


