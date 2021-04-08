import styled from "styled-components"
import BoardItem from "./BoardItem";

interface BoardListProps {
    postList : number[];
}

export function BoardList({postList} : BoardListProps) {
    return <ListWrap>
        <ItemWrap>
            {postList.map(e => <BoardItem key={e} title={e.toString()} />)}
        </ItemWrap>
    </ListWrap>
};

const ItemWrap = styled.div`
    overflow: auto;
`;

const ListWrap = styled.div`
    max-width: 300px;
    width: 30%;
    display: flex;
    flex-direction: column;
    background-color: #CEB0D2;
`;