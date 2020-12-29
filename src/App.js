import './App.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useEffect, useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const [birthData, setBirthData] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      const ret = await axios.get('http://' + window.location.hostname + ':3001/getData');
      setBirthData(ret.data);
    }
    getdata();
  }, [])

  return (
    <div className="App">
      <Header />
      <MainView birthData={birthData} />
      {/* <RegisterForm setBirthData={setBirthData} /> */}
      <PeopleList birthData={birthData} />
    </div>
  );
}

function Header(props) {
  return <header>
    생일 관리
  </header>
}

function MainView({ birthData }) {

  const findBirthday = (data, _month, _day) => {
    let list = [];
    data.forEach(e => {
      const month = new Date(e[2]).getMonth() + 1;
      const day = new Date(e[2]).getDate();
      if (month === _month && day === _day) {
        list.push(
          <div key={e[1]}><img width='15' height='15' alt='cake' src="./img/cake.png" /> {e[1]}</div>);
      }
    });
    return list;

  }

  const test = (e) => {
    const month = e.date.getMonth() + 1;
    const day = e.date.getDate();
    return findBirthday(birthData, month, day);
  }

  return <div className='main-view'>
    <Calendar
      navigationAriaLabel={'asd'}
      prev2Label={null}
      next2Label={null}
      calendarType={'US'}
      className='mainCal'
      tileContent={test}
      tileClassName='maintile'
    />
  </div>
}

// function RegisterForm({ setBirthData }) {
//   const [date, onChange] = useState(new Date('1990/01/01'));
//   const [isCalendar, toggleCalendar] = useState(false);
//   const [isSolar, setSolar] = useState(true);
//   const [nickname, setNickname] = useState('');
//   const calendarRef = useRef();

//   useEffect(() => {
//     window.addEventListener('click', e => {
//       if(calendarRef.current){
//         calendarRef.current.contains(e.target) 
//       }

//       if(e.target.id === 'birthinput')
//         return;

//       if(calendarRef.current){
//         console.log(!e.target.classList.contains('react-calendar__tile'))
//         console.log(!calendarRef.current.contains(e.target))
//         if(
//           !e.target.classList.contains('react-calendar__tile') &&
//           !calendarRef.current.contains(e.target) ){
//             toggleCalendar(false);
//         }
//       }
//     })
//   },[calendarRef])

//   const spanStyle = {
//     width: '50px'
//   }

//   const onClickRegister = async () => {
//     if (!nickname) {
//       alert("닉네임을 입력해 주세요");
//       return;
//     }
//     else if (date.getTime() === new Date('1990/1/1').getTime()) {
//       if (!window.confirm("생일이 초기값입니다. 등록하시겠습니까?")) {
//         return;
//       }
//     }

//     const req = { nickname, date, isSolar };
//     const ret = await axios.post('http://' + window.location.hostname + ':3001/getData', req)
//     if (ret.data.code === '200') {
//       alert("등록되었습니다");
//       setNickname('');
//       setBirthData(e => e.concat(req));
//     }
//     else if (ret.data.code === '401') {
//       alert("이미 등록된 닉네임입니다");
//     }
//   }

//   return <div className='register'>
//     <div className='regi-header'>
//       등록하기
//     </div>

//     <div>
//       <span style={spanStyle}>닉네임</span>
//       <input value={nickname} onChange={e => setNickname(e.target.value)} />
//     </div>

//     <div>
//       <span style={spanStyle}>생일</span>
//       <input
//         id='birthinput'
//         readOnly
//         onClick={() => toggleCalendar(true)}
//         placeholder='생일'
//         value={date.toLocaleDateString()} />
//       {
//         isCalendar && <Calendar
//           inputRef={calendarRef}
//           calendarType={'US'}
//           className={'abs regical'}
//           defaultValue={date}
//           defaultView='decade'
//           onChange={(date) => {
//             toggleCalendar(e => false);
//             onChange(date);
//           }} />}
//     </div>

//     <div>
//       <label>
//         <input id='solar' checked value={isSolar} onChange={() => setSolar(true)} name='type' type='radio' />
//           양력
//           </label>
//       <label>
//         <input id='lunar' value={!isSolar} onChange={() => setSolar(false)} name='type' type='radio' />
//           음력
//           </label>
//     </div>


//     <div>
//       <button onClick={onClickRegister} >등록</button>
//     </div>

//   </div>
// }

function PeopleList({birthData}) {
  birthData.sort((a,b) => {
    const dateA = new Date(a[2]);
    const dateB = new Date(b[2]);
    dateA.setFullYear(1990);
    dateB.setFullYear(1990);
    if(dateA.getTime() > dateB.getTime())
      return 1;
    else if(dateA.getTime() < dateB.getTime())
      return -1;
    return 0;
  })

  const list = birthData.map(e => {
    const month = new Date(e[2]).getMonth() + 1;
    const day = new Date(e[2]).getDate();

    return <tr key={e[1]}>
      <td>{e[1]}</td>
      <td>{month + '월 ' + day + '일' + (e[3] === "양력" ? "" : ' (음력)')}</td>
    </tr>
  })

  return <div style={{ width: '200px', padding: '5px' }}>
    <table style={{ width: '100%' }}>
      <tbody>

        <tr>
          <td>
            닉네임
          </td>
          <td>
            생일
          </td>
        </tr>
        {list.length === 0 ? <tr ><td colSpan='2'>등록된 인원이 없습니다</td></tr> : list}
      </tbody>
    </table>
  </div>
}

export default App;
