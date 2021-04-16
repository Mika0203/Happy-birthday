import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api";
import { BirthdayData } from "../../interface";
import { BoardList, PostProps } from "./PostList";
import { BoardPosting } from "./Posting/BoardPosting";
import { BoardView } from "./Viewer/BoardView";
import pen from '../../asset/pen.png';

enum BoardType {
    NULL,
    POSTING,
    VIEW,
    MODIFY
};

interface BoardProps {
    birthData: BirthdayData[];
};

export function Board({ birthData }: BoardProps) {
    const [postList, setPostList] = useState<PostProps[]>([]);
    const [currentBoardType, setCurrentBoardType] = useState<BoardType>(BoardType.NULL);
    const [currentViewPost, setCurrentViewPost] = useState<number>(0);

    const onClickPostItem = (dir: number) => {
        setCurrentViewPost(dir);
        setCurrentBoardType(BoardType.VIEW);
    };

    useEffect(() => {
        api.getPostList().then(e => {
            setPostList(e.reverse());
        })
    }, []);

    const posting = (frm : FormData, data : PostProps) => {
        api.posting(frm).then(res => {
            if(res.data.code === 'success'){
                alert("포스팅 되었습니다.");
                setPostList(e => e.concat({
                    birthList : data.birthList,
                    date : data.date,
                    dir : new Date(data.date).getTime()
                }));
                setCurrentBoardType(BoardType.NULL);
            };
        });
    };

    const deletePost = (date : number) => {
        if(!window.confirm("게시글을 삭제하시겠어요?"))
            return;

        if(window.prompt('비밀번호를 입력해주세요') !== '1122'){
            return;
        }

        api.deletePost(date.toString()).then(res => {
            if(res.data.res === 'success'){
                setPostList((e : any) => e.filter((list : any) => list.dir !== date))
                setCurrentBoardType(BoardType.NULL);
            }
        });
    };

    let render = null;

    switch (currentBoardType) {
        case BoardType.NULL:
            render = null;
            break;
        case BoardType.POSTING:
            render = <BoardPosting posting={posting} birthData={birthData} />
            break;
        case BoardType.VIEW:
            render = <BoardView deletePost={deletePost} dir={currentViewPost} />
            break;
    }

    return <ArticleWrap>
        <BoardList onClickPostItem={onClickPostItem} postList={postList} />
        {render}
        {
            (currentBoardType === BoardType.NULL || currentBoardType === BoardType.VIEW) &&
            <Posting title='새 글 작성' onClick={() => setCurrentBoardType(BoardType.POSTING)} src={pen} />
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
