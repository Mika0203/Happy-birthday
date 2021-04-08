import styled from "styled-components"

interface BoardItemProps {
    title : string;
}

export default function BoardItem({title} : BoardItemProps) {
    return <Item>
        {title}
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