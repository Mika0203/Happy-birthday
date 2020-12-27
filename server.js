const express = require('express');
const http = require('http');
const app = express();
const mongodb = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

var server = http.createServer(app);
mongodb.construct()

app.get('/', (req, res) => {
    console.log('hello')
    res.send('hello world')
})

app.post('/register', async (req, res) => {
    const ret = await mongodb.register(req.body);
    res.send(ret);
})

app.get('/getData', async (req, res) => {
    res.send(await mongodb.getData() || []);
})

server.listen(1111, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});
