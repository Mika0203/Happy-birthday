import styled from "styled-components";
import { BoardArticle, BoardList } from "../components/Board";
import pen from '../asset/pen.png';
import { useState } from "react";
import { BirthdayData } from "../interface";

interface BoardPageProps {
    birthData : BirthdayData[];
}

export default function BoardPage({birthData} : BoardPageProps){
    const [postList, setPostList] = useState([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]);

    return <ArticleWrap>
        <BoardList postList={postList}/>
        <BoardArticle birthData={birthData} />

        <Posting src={pen} />
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

