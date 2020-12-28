const Mattermost = require('node-mattermost');
const fs = require('fs');
const json = JSON.parse(fs.readFileSync('./config.json'));
const schedule = require('node-schedule');

const homepage = json.homepage;
const hookurl = json.hookurl;
const mattermost = new Mattermost(hookurl);

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return bitmap.toString('base64');
}

module.exports = {
    init(data) {
        this.birthdata = data;
        // this.send_month_birth();
        // this.send_day_birth();

        const scheduleOfDay = '5 9 * * 1-5';
        schedule.scheduleJob(scheduleOfDay, () => this.send_day_birth());

        const scheduleOfMonth = '5 9 * * 1-5';
        schedule.scheduleJob(scheduleOfMonth, () => {
            const today = new Date();
            if(today.getDay() == 0 || today.getDay() == 6){
                if(today.getDay() == 0)
                    today.setDate(today.getDate() + 1);
                else if(today.getDay() == 6)
                    today.setDate(today.getDate() + 2);
                schedule.scheduleJob(today, () => this.send_month_birth());
            }
            else{
                this.send_month_birth();
            }
        });
    },

    set_data(data){
        this.birthdata = data;
    },

    send(msg) {
        mattermost.send({
            text: msg,
            // channel: '#test',
            channel: '#c8q3gchtp',
            username: '생일축하 봇',
            icon_url: 'data:image/png;base64,' + base64_encode('./public/img/cake.png'),
        })
    },

    send_month_birth() {
        const today = new Date();
        const month = today.getMonth();
        const people = this.birthdata.filter(e => new Date(e[2]).getMonth() == month);
        people.sort((a,b) => {
            const Adate = new Date(a[2]);
            const Bdate = new Date(b[2]);

            Adate.setFullYear(1990);
            Bdate.setFullYear(1990);
            
            if(Adate.getTime() > Bdate.getTime())
                return 1;
            else if(Adate.getTime() < Bdate.getTime())
                return -1;
            return 0;
        })

        let msg = '';
        if(people.length > 0) {
        msg += "# 이번 달의 생일자입니다 \n";
            msg += '|닉네임 | 생일 | \n \
            |----------|:-------------:|------:| \n';
            people.forEach(element => {
                const newDate = new Date(element[2]);
                msg += '|' + element[1] + '|' + (newDate.getMonth() + 1) + '월 ' + newDate.getDate() + '일' + '\n';
            });
        } 
        else if(people.length == 0) {
            msg += '# 이번 달은 생일자가 없습니다 ㅜ_ㅜ';
        }

        msg += `[페이지 보기](${homepage})`
        this.send(msg);
    },

    send_day_birth() {
        const today = new Date(new Date().toLocaleDateString());
        today.setDate(today.getDate() + 1);
        const startDay = new Date(today);
        const dayOfWeek = today.getDay();
        
        if(dayOfWeek == 1){
            startDay.setDate( startDay.getDate() - 2);
        }

        const people = this.birthdata.filter(e => {
            const newDate = new Date(new Date(e[2]).toLocaleDateString());
            newDate.setFullYear(today.getFullYear()); 
            if(startDay.getTime() <= newDate.getTime() && today.getTime() >= newDate.getTime())
                return e;
        });

        people.sort((a,b) => {
            const Adate = new Date(a[2]);
            const Bdate = new Date(b[2]);

            Adate.setFullYear(1990);
            Bdate.setFullYear(1990);
            
            if(Adate.getTime() > Bdate.getTime())
                return 1;
            else if(Adate.getTime() < Bdate.getTime())
                return -1;
            return 0;
        })

        let msg = '';
        if(people.length > 0) {
            if(dayOfWeek == 1)
                msg += "# 주말 간, 오늘의 생일자입니다 \n";
            else 
                msg += "# 오늘의 생일자입니다 \n";
            msg += "## 모두 축하해주세요! \n";
                msg += '|닉네임 | 생일 | \n \
                |----------|:-------------:|------:| \n';
                people.forEach(element => {
                    const newDate = new Date(element[2]);
                    msg += '|' + element[1] + '|' + (newDate.getMonth() + 1) + '월 ' + newDate.getDate() + '일' + '\n';
                });
            
            msg += `[페이지 보기](${homepage})`
            this.send(msg);
        } 
    }
}