const express = require('express');
const http = require('http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { default: axios } = require('axios');
const cheerio = require('cheerio');
const schedule = require('node-schedule');
const fs = require('fs');

const multer = require('multer');
const upload = multer();

const mattermost = require('./lib/mattermost');
const lunarConverter = require('./lib/lunar-to-solar');

let birthdata = [];

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = http.createServer(app);

const dbPath = './db'

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

app.get('/birth-data', async (req, res) => {
    const data = await GetBirthData();
    res.send(data);
});



app.post('/posting', upload.any(), async(req, res) => {
    const data = JSON.parse(req.body.data);
    const files = req.files;
    console.log(data)
    console.log(files)

    const date = new Date(data.date).getTime();
    const savepath = `${dbPath}/${date}`;

    makeFolder(`${dbPath}`)
    makeFolder(savepath);
    const imgfilepath = files.map((file,idx) => saveImg(savepath, file,idx))
    data.imgs = imgfilepath;

    saveJson(`${dbPath}/${date}/data.json`, data);
    addDB(`${dbPath}/data.json`, data);    
    res.send({
        code : 'success'
    });
});

app.get('/post-list', async(req,res) => {
    res.send(getDB(`${dbPath}/data.json`));
});

app.get('/post/:dir', async(req,res) => {
    const dir = req.params.dir;
    const json = getDB(`${dbPath}/${dir}/data.json`);
    res.send(json);
});

const saveImg = (savepath, file,idx) => {
    fs.createWriteStream(`./${savepath}/${idx}.png`).write(file.buffer);
    return `${savepath}/${idx}.png`;
}

const makeFolder = dir => {
    if(!fs.existsSync(dir))
        fs.mkdirSync(dir);
};

const saveJson = (path,data) => {
    fs.writeFileSync(path, JSON.stringify(data));
};

const addDB = (path, data) => {
    if(!fs.existsSync(path))
        fs.writeFileSync(path, JSON.stringify({data : []}));

    const json = getDB(path);
    const newDate = new Date(data.date);
    const insertData = {
        date : data.date,
        birthList : data.birthList.map(e => e.nickname),
        dir : newDate.getTime()
    };
    json.data.push(insertData)
    fs.writeFileSync(path, JSON.stringify(json));
};

const getDB = (path) => {
    if(!fs.existsSync(path)){
        makeFolder(`${dbPath}`);
        fs.writeFileSync(path, JSON.stringify({data : []}));
    };

    const json = JSON.parse(fs.readFileSync(path));
    return json;
};

server.listen(3001, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});
