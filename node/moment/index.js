var moment = require('moment');
console.log(moment().format("yyyy-MM-d HH:mm:ss"));
// 获取Unix 毫秒时间戳
console.log(moment().valueOf());
console.log(moment().format('x'));
// 获取Unix 时间戳
console.log(moment().format('X'));
console.log(moment().unix());

