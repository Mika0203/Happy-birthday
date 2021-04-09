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
        <div>{`${year}년 ${month}월 생일파티`}</div>
        <div>{`${month}.${day}`}</div>
    </Item>
}

const Item = styled.div`
    border-bottom : 1px solid;
    height: 50px;
    cursor: pointer;
    &:hover{
        background-color : rgba(0,0,0,0.1);
    }
`;