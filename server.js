var express = require('express'),
    fs = require('fs'),
    url = require('url'),
    app = express(),
    bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

  var html = '<form action="/" method="post">' +
    'Enter your name:' +
    '<input type="text" name="title" placeholder="..." />' +
    '<br>' +
    'Body:' +
    '<textarea type="text" name="body" placeholder="..." ></textarea>' +
    '<br>' +
    '<button type="submit">Submit</button>' +
    '</form>';
  res.send(html);
});

app.post('/', urlencodedParser, function(req, res) {
  var body = '';

  body += '##' + req.body.title + '\n';
  body += req.body.body + '\n';

  filePath = __dirname + '/public/'+ req.body.title + '.txt';

  fs.appendFile(filePath, body, function() {
    res.end();
  });
});

app.listen(8080);
