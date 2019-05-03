var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
var comments = [
    {
      name: '张三',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三2',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三3',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三4',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    },
    {
      name: '张三5',
      message: '今天天气不错！',
      dateTime: '2015-10-16'
    }
  ]
http
    .createServer(function (req,res) {
        var parseObj = url.parse(req.url,true);
        var pathName = parseObj.pathname;
        if (pathName === '/') {
            fs.readFile('./view/index.html',function (err,data) {
                if (err) {
                    return res.end('404 Not Found')
                }
                var htmlStr = template.render(data.toString(),{
                    comments:comments
                })
                res.end(htmlStr);
            })
        } else if (pathName === '/post') {
            fs.readFile('./view/post.html', function (err,data) { 
                if (err) {
                    return res.end('404 Not Found');
                } else {
                    res.end(data)
                }
            })
        } 
        else if (pathName.indexOf('/public/') === 0) {
            fs.readFile('.' + pathName,function (err,data) {
                if (err) {
                    return res.end('404 Not Found');
                }
                res.end(data);
            }); 
        } else if (pathName === '/pinglun') {
            // console.log("收到表单请求了" , parseObj.query);
            // res.end(JSON.stringify(parseObj.query));
            var comment = parseObj.query
            comment.dataTime = '2019-5-3 10:33'
            comments.unshift(comment)

            // 重定向
            res.statusCode = 302
            res.setHeader('Location','/')
            res.end()
        }
        else {
            fs.readFile ('./view/404.html',function (err,data) {
                if (err) {
                    return res.end ('404 Not Found');
                } else {
                    res.end(data);
                }
            })
        }
    })
    .listen(4000,function () {
        console.log("running....")
    })