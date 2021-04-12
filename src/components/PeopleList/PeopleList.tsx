import styled from "styled-components";
import { BirthdayData } from "../../interface";

interface PeopleListProps {
    birthData: BirthdayData[]
}

export function PeopleList(props: PeopleListProps) {
    props.birthData.sort((a, b) => {
        const dateA = new Date(a.realBirthday);
        const dateB = new Date(b.realBirthday);
        dateA.setFullYear(1990);
        dateB.setFullYear(1990);
        if (dateA.getTime() > dateB.getTime())
            return 1;
        else if (dateA.getTime() < dateB.getTime())
            return -1;
        return 0;
    })

    const list = props.birthData.map(birth => {
        const month = new Date(birth.realBirthday).getMonth() + 1;
        const day = new Date(birth.realBirthday).getDate();

        return <Tr key={birth.nickname}>
            <td>{birth.nickname}</td>
            <td>{month + '월 ' + day + '일' + (birth.type === "양력" ? "" : '')}</td>
        </Tr>
    })

    return <Container>
        <Table>
            <tbody>
                <tr>
                    <td>
                        닉네임
                    </td>
                    <td>
                        생일
                    </td>
                </tr>
                {list.length === 0 
                ?   <tr>
                        <td colSpan={2}>등록된 인원이 없습니다</td>
                    </tr> 
                :   list}
            </tbody>
        </Table>
    </Container>
}

const Container = styled.div`
    width : 200px;
    padding : 5px;
    margin: auto;
    margin-top : 20px;
`;

const Table = styled.table`
    width : 100%;
    border: solid 1px black;
    text-align : center;
`;

const Tr = styled.tr`
    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`;