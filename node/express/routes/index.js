var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 静态资源
//Express 在静态目录查找文件,存放静态文件的目录名不会出现在 URL 中。
// app.use(express.static('public'))
// 通过带有 /static 前缀地址来访问 public 目录中的文件
router.use('/static', express.static('public'))
module.exports = router;
