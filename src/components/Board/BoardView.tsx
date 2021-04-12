import styled from "styled-components"
import { useEffect } from "react";
import api from "../../api";
import { useState } from "react";
import config from "../../asset/config";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { BirthdayData } from "../../interface";
import SnackListContainer, { Snack } from "./SnackList";

interface ViewProps {
    date: Date,
    birthList: BirthdayData[],
    description: string,
    imgs: string[],
    snackList: Snack[]
};
interface BoardViewProps {
    dir: number;
    deletePost: Function;
};

export function BoardView({ dir, deletePost}: BoardViewProps) {
    const [currentViewData, setCurrentViewData] = useState<ViewProps>({
        date: new Date(),
        birthList: [],
        description: '',
        imgs: [],
        snackList: []
    });

    useEffect(() => {
        api.getPost(dir).then(res => {
            res.data.date = new Date(res.data.date);
            setCurrentViewData(res.data);
        });
    }, [dir]);

    return <Container>
        <button onClick={() => deletePost(currentViewData.date.getTime())}>삭제</button>
        <button>사진 추가</button>
        <Title>
            {`${currentViewData?.date.getFullYear()}년 ${currentViewData?.date.getMonth() + 1}월 생일파티`}
        </Title>
        <BirthDayList>
            {currentViewData?.birthList.map(person => {
                const date = new Date(person.realBirthday);
                return <div key={person.nickname}>
                    {`${person.nickname} ${date.getMonth() +1}월 ${date.getDate()}일`}
                </div>;
            })}
        </BirthDayList>
        {currentViewData.imgs.length > 0 && <ImageViewer imgsrc={currentViewData?.imgs} />}
        <SnackList>
            <tbody>
                <tr>
                    <th>이름</th>
                    <th>가격</th>
                    <th>수량</th>
                    <th>합계</th>
                </tr>
                <SnackListContainer snackList={currentViewData?.snackList || []} />
            </tbody>
        </SnackList>
    </Container>
};

interface ImageViewerProps {
    imgsrc: string[] | undefined
};

function ImageViewer({ imgsrc }: ImageViewerProps) {
    const images = imgsrc?.map(e => (
        {
            original: config.serverURL + e,
            thumbnail: config.serverURL + e,
        }));

    return <ImageContiner>
        <ReactImageGallery
            infinite={false}
            showPlayButton={false}
            items={images || []} />
    </ImageContiner>
};

const ImageContiner = styled.div`
    max-width: 600px;
    margin : auto;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 2em;
    margin: 10px
`;

const BirthDayList = styled.h3`
    text-align: center;
`;

const Container = styled.article`
    flex: 1;
    padding: 25px;
    overflow: auto;
`;

const SnackList = styled.table`
    border: 1px solid;
    width: 100%;
    text-align: center;
`;