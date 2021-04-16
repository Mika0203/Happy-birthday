import styled from "styled-components"

interface BoardItemProps {
    date: Date;
    dir: number;
    onClick: Function;
}

export default function BoardItem({ date, dir, onClick }: BoardItemProps) {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return <Item onClick={() => onClick(dir)}>
        <Title>{`${year}년 ${month}월 생일파티`}</Title>
        <Date>{`${month}월 ${day}일`}</Date>
    </Item>
};

const Item = styled.div`
    border-bottom : 1px solid white;
    height: 50px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover{
        background-color : rgba(0,0,0,0.1);
    }
`;

const Title = styled.span`
    margin-left : 5px;
`;

const Date = styled.span`
    text-align : end;
    margin-right : 10px;
`;
