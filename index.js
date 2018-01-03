'use strict'
const express = require('express');
const app = express();
const trends = require('./trends');

//处理错误用的工厂方法，防止await出错而挂起路由
const awaitHandlerFactory = (middleware) => {
    return async (req, res, next) => {
        try {
            await middleware(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

app.get('/', awaitHandlerFactory(async (req, res) => {
    var myTrends = new trends('bitcoin', new Date('2013-01-01'), new Date(Date.now()), 'CN');
    var json = await myTrends.getJson();
    res.send(json);
}));

app.get('/data/:keywords', awaitHandlerFactory(async (req, res) => {
    var keywords = req.params.keywords.split(',');
    console.log(req.query);
    var start = req.query.s;
    var end = req.query.e;
    var myTrends = new trends(keywords, new Date(start), new Date(end), '');
    var json = await myTrends.getTrends();
    res.send(json);

}));


app.get('/trends/*', awaitHandlerFactory(async (req, res) => {
    console.log(req.query);
    console.log(req.get('User-Agent'));
    res.send(req.query);
}));

var server = app.listen(8081, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log(`服务器已经启动，使用http://${host}:${port}`);
})

