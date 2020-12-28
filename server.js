const express = require('express');
const http = require('http');
const app = express();
const mongodb = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const cheerio = require('cheerio');

app.use(cors());
app.use(bodyParser.json());

var server = http.createServer(app);
mongodb.construct()





// app.post('/register', async (req, res) => {
//     const ret = await mongodb.register(req.body);
//     res.send(ret);
// })

app.get('/getData', async (req, res) => {
    // res.send(await mongodb.getData() || []);

    const ret = await axios.get('https://docs.google.com/spreadsheets/d/1KZxtmNI-6r0QGDUXYwzudDv4r98kN206ZL6lL0ZrA_s/edit#gid=2046128309');
    const $ = cheerio.load(ret.data);
    const container = $('#waffle-grid-container').find('tbody');
    const trs = container.find('tr');
    let data = [];

    trs.each((idx, tr) => {
        if(idx != 0){
            let person = [];
            $(tr).find('td').each((tdidx, td) => {
                if(tdidx == 0 && $(td).text() == '')
                    return false;
                if(tdidx > 3)
                    return false;
                person.push($(td).text())
            }) 
            if(person.length > 1)
                data.push(person);
        }
    })
    res.send(data);
})

server.listen(1111, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});
