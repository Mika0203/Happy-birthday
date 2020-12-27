const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');
var db = undefined;

module.exports = {
    construct() {
        const url = 'mongodb://localhost:27017';
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
            if(err){
                console.error("[MongoDB] Connect failed to server [", url, "]")
            }
            else {
                console.log("[MongoDB] Connected successfully to server [", url, "]");
                db = client.db('birthday');
            }
        });
    },

    async register(data){
        if(await db.collection('user').findOne({nickname : data.nickname} )){
            return {state : 'fail', code : '401'};
        }

        await db.collection('user').insertOne(data);
        return {state : 'suc', code : '200'};
    },

    async getData(){
        const find = await db.collection('user').find();
        let retdata = [];
        await find.forEach(element => {
            retdata.push(element);
        });
        return retdata;
    }
}