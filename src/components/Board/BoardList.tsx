import styled from "styled-components"
import BoardItem from "./BoardItem";

export interface PostProps {
    date : string;
    birthList : string[];
    dir : number;
}
interface BoardListProps {
    postList : PostProps[];
    onClickPostItem : Function;
}

export function BoardList({postList, onClickPostItem} : BoardListProps) {
    return <ListWrap>
        <ItemWrap>
            {postList.map(e => <BoardItem key={e.date} onClick={onClickPostItem} dir={e.dir} date={new Date(e.date)}/>)}
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