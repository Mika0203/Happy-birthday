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
    const date = new Date(data.date).getTime();
    makeFolder(`${dbPath}`)
    makeFolder(`${dbPath}/${date}`);
    const imgfilepath = files.map((file,idx) => saveImg(dbPath, date, file,idx))
    data.imgs = imgfilepath;

    saveJson(`${dbPath}/${date}/data.json`, data);
    addDB(`${dbPath}/data.json`, data);    
    res.send({
        code : 'success'
    });
});

app.get('/img/:dir/:file', (req,res) => {
    const dir = req.params.dir;
    const file = req.params.file;
    console.log(`${dbPath}/${dir}/${file}`);
    res.sendFile(`${__dirname}/${dbPath}/${dir}/${file}`)
});

app.get('/post-list', async(req,res) => {
    res.send(getDB(`${dbPath}/data.json`));
});

app.get('/post/:dir', async(req,res) => {
    const dir = req.params.dir;
    const json = getDB(`${dbPath}/${dir}/data.json`);
    res.send(json);
});

app.delete('/post/:dir', async(req,res) => {
    const dir = req.params.dir;
    fs.rmdirSync(`${dbPath}/${dir}`,{
        recursive : true
    });
    popDB(dbPath, dir);
    res.send({ 
        code : 200,
        res : 'success'
    });
});

const saveImg = (dbpath, savepath, file,idx) => {
    fs.createWriteStream(`./${dbpath}/${savepath}/${idx}.png`).write(file.buffer);
    return `/img/${savepath}/${idx}.png`;
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
        fs.writeFileSync(path, JSON.stringify([]));

    const json = getDB(path);
    const newDate = new Date(data.date);
    const insertData = {
        date : data.date,
        birthList : data.birthList.map(e => e.nickname),
        dir : newDate.getTime()
    };
    json.push(insertData)
    fs.writeFileSync(path, JSON.stringify(json));
};

const popDB = (path, date) => {
    console.log(path,date);
    const json = getDB(`${dbPath}/data.json`);
    const newJson = json.filter(e => e.dir != date);
    fs.writeFileSync(`${dbPath}/data.json`, JSON.stringify(newJson));
}

const getDB = (path) => {
    if(!fs.existsSync(path)){
        makeFolder(`${dbPath}`);
        fs.writeFileSync(path, JSON.stringify([]));
    };

    const json = JSON.parse(fs.readFileSync(path));
    return json;
};

server.listen(3001, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});
