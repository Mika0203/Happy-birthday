import styled from "styled-components";
import { BoardView, BoardList, BoardPosting } from "../components/Board";
import pen from '../asset/pen.png';
import { useState } from "react";
import { BirthdayData } from "../interface";
import { useEffect } from "react";
import api from "../api";
import { PostProps } from "../components/Board/BoardList";

interface BoardPageProps {
    birthData: BirthdayData[];
};

enum BoardType {
    NULL,
    POSTING,
    VIEW,
    MODIFY
};

export default function BoardPage({ birthData }: BoardPageProps) {
    const [postList, setPostList] = useState<PostProps[]>([]);
    const [currentBoardType, setCurrentBoardType] = useState<BoardType>(BoardType.NULL);
    const [currentViewPost, setCurrentViewPost] = useState<number>(0);

    const onClickPostItem = (dir: number) => {
        setCurrentViewPost(dir);
        setCurrentBoardType(BoardType.VIEW);
    };

    useEffect(() => {
        api.getPostList().then(e => {
            setPostList(e);
        })
    }, []);

    let render = null;

    switch (currentBoardType) {
        case BoardType.NULL:
            render = null;
            break;
        case BoardType.POSTING:
            render = <BoardPosting birthData={birthData} />
            break;
        case BoardType.VIEW:
            render = <BoardView dir={currentViewPost} />
            break;
    }

    return <ArticleWrap>
        <BoardList onClickPostItem={onClickPostItem} postList={postList} />
        {render}
        {
            (currentBoardType === BoardType.NULL || currentBoardType === BoardType.VIEW) &&
                <Posting onClick={() => setCurrentBoardType(BoardType.POSTING)} src={pen} />
        }
    </ArticleWrap>
}

const ArticleWrap = styled.article`
    display : flex;
    flex: 1;
    overflow: auto;
`;

const Posting = styled.img`
    background-color: #CEB0D2;
    cursor: pointer;
    height: 35px;
    width: 35px;
    padding: 5px;
    border-radius: 50px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    &:hover{
        transform: scale(1.1);
    };
`;

