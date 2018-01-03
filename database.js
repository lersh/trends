'use strict'
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/db.sqlite3.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log('数据库打开成功');
    }
});

db.serialize(() => {
    var stmt = db.prepare("INSERT INTO test(tktype,tableid) values(?,?);");
    for (var i = 0; i <= 100; i++) {
        stmt.run([i + 200, `thank you ${i}`]);
    }
    stmt.finalize(err => {
        console.log('执行完毕');
    })
});

db.close();