import styled from 'styled-components';
import { BirthdayData } from '../../../interface';
import { BirthdayCalender } from '../../Calendar';

interface SelectDateProps {
    setDate: Function;
    birthData : BirthdayData[];
}

export function SelectDate({ setDate, birthData}: SelectDateProps) {
    const onClickDay = (e: Date) => {
        setDate(e);
    };

    return <Container>
        <BirthdayCalender 
            onClick={onClickDay}
            className='mainCal' 
            tileClassName='maintile' 
            birthdayData={birthData}/>
    </Container>
};

const Container = styled.div`
    margin: 0px auto;
`;