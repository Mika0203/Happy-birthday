import { PeopleList } from "../components/PeopleList";
import { BirthdayData } from "../interface";
import { BirthdayCalender } from '../components/Calendar';
import styled from 'styled-components';

interface CalendarPageProps {
    birthData : BirthdayData[]
};

export default function CalendarPage({birthData} : CalendarPageProps) {
    return <ArticleWrap>
        <PeopleList birthData={birthData} />
        <BirthdayCalender className='mainCal' tileClassName='maintile' birthdayData={birthData} />
    </ArticleWrap>
};

const ArticleWrap = styled.article`
    display : flex;
    height : 100%;

    @media(max-width: 1023px){
        flex-direction : column-reverse;
        justify-content: flex-end;
    }
`;