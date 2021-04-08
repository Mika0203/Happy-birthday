import { BirthdayData } from "../../interface";
import Calendar, { CalendarTileProperties } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import cake from '../../asset/cake.png';

interface BirthdayCalenderProps {
    birthdayData: BirthdayData[];
    className? : string;
    tileClassName? : string; 
    onClick? : Function;
}

export function BirthdayCalender(props: BirthdayCalenderProps) {
    const findBirthday = (data: BirthdayData[], _month: number, _day: number): JSX.Element => {
        return <div>
            {
                data.map(e => {
                    const month = new Date(e.realBirthday).getMonth() + 1;
                    const day = new Date(e.realBirthday).getDate();
                    if (month === _month && day === _day) {
                        return (
                        <div key={e.nickname}>
                            <img width='15' height='15' alt='cake' src={cake} />{e.nickname}
                        </div>);
                    }
                })
            }
        </div>
    }

    const birthdayIcon = (e: CalendarTileProperties): JSX.Element => {
        const month = e.date.getMonth() + 1;
        const day = e.date.getDate();
        return findBirthday(props.birthdayData, month, day);
    }

    return <Container>
        <Calendar
            onClickDay={(date) => props.onClick && props.onClick(date)}
            navigationAriaLabel={'asd'}
            prev2Label={null}
            next2Label={null}
            calendarType={'US'}
            className={props.className}
            tileContent={birthdayIcon}
            tileClassName={props.tileClassName}
        />
    </Container>
}

const Container = styled.div`
    width: 100%;
    max-width: 700px;
    margin: auto;
    margin-top: 25px;
`;

