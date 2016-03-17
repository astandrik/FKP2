var express = require('express');
var path = require('path');
var testData = require('./testData/data.js');
var app = express();

app.use(express.static(path.join(__dirname, '../dist/css')));
app.use(express.static(path.join(__dirname, '../dist/libs')));
app.use(express.static(path.join(__dirname, '../testData')));
app.use(express.static(path.join(__dirname, '..')));

app.get('/', function(req, res){
  res.sendFile(path.resolve('index.html'));
});

app.get('/tree', function(req,res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(testData.tree));
})


app.listen(3000);
console.log('Listening on port 3000');
