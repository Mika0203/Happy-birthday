const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');

const mattermost = require('./lib/mattermost');
const lunarConverter = require('./lib/lunar-to-solar');

let birthdata = [];

app.use(cors());
app.use(bodyParser.json());

var server = http.createServer(app);


const GetBirthData = async () => {
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
    birthdata = data.map(e => {
        const date = e[2];
        const split = date.split('.');

        if(e[3] == '음력'){
            const solarDate = lunarConverter.lunarToSolar(new Date().getFullYear(), split[1], split[2]);
            const year = solarDate.solarYear;
            const month = solarDate.solarMonth;
            const day = solarDate.solarDay;
            e.push(`${year}.${month}.${day}`)
        } else {
            e.push(e[2])
        }
        return e;
    });
    console.log(birthdata)
    return birthdata;
}

(async function(){
    schedule.scheduleJob('0 9 * * *', async () => mattermost.set_data(await GetBirthData()))
    mattermost.init(await GetBirthData());
})()

// app.post('/register', async (req, res) => {
//     const ret = await mongodb.register(req.body);
//     res.send(ret);
// })

app.get('/getData', async (req, res) => {
    // res.send(await mongodb.getData() || []);
    const data = await GetBirthData();
    res.send(data);
})

server.listen(3001, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});
