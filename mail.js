'use strict';
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 994,
    secure: true,
    auth: {

    }
});
var mailOptions = {
    from: '"Lersh"<lersh@163.com>',
    to: 'lersh@163.com',
    cc: 'timsmiling@126.com,jiangtao7@staff.sina.com.cn',
    subject: '测试下node发邮件',
    text: '测试下node发邮件',
    html: '<b>测试下node发邮件,看看cc能不能收到</b>'
};

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    }
    else {
        console.log('Message sent: %s', info.messageId);
    }
});

