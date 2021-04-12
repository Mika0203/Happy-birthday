import { useState } from "react";
import { SelectDate } from "./SetDate";
import { UploadSnack, SnackProps } from "./SetSnack";
import { TargetUser } from "./SetTargetUser";

import styled from "styled-components"
import { BirthdayData } from "../../../interface";
import { useEffect } from "react";
import { Description } from "./SetDescription";
import { UploadPhoto } from "./SetPhoto";
import { FilesToFormData } from "../../../lib";

interface BoardPostingProps {
    birthData: BirthdayData[];
    posting: Function;
};


export function BoardPosting({ birthData, posting }: BoardPostingProps) {
    const [date, setDate] = useState<Date>();
    const [snackList, setSnackList] = useState<SnackProps[]>([]);
    const [birthList, setBirthList] = useState<BirthdayData[]>([]);
    const [photoList, setPhotoList] = useState<File[]>([]);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if (date) {
            const month = date.getMonth() + 1;
            const filterd = birthData.filter(data => parseInt(data.realBirthday.split('.')[1]) === month);
            setBirthList(filterd)
        }
    }, [date, birthData]);

    const onClickUpload = () => {
        if (!date) {
            alert("행사 실시 일자를 선택해주세요");
            return;
        };

        if (!window.confirm('포스팅하시겠어요?')) {
            return;
        };

        const frm = FilesToFormData(photoList);
        const data = { date, snackList, birthList, description };
        frm.append('data', JSON.stringify(data));
        posting(frm, data);
    };

    return <Container>
        <SelectDate birthData={birthData} setDate={setDate} />
        <TargetUser birthdayUser={birthList} />
        <UploadSnack
            setSnackList={setSnackList}
            snackList={snackList}
        />
        <UploadPhoto setPhotoList={setPhotoList} />
        <Description setValue={setDescription} value={description} />
        <UploadButton onClick={onClickUpload}>업로드</UploadButton>
    </Container>
};

const Container = styled.div`
    flex: 1;
    padding: 25px;
    overflow: auto;

    >*{
        padding: 10px 0px;
    }
`;

const UploadButton = styled.button`
    width: 200px;
    height: 50px;
    position: relative;
    float: right;
    margin: 10px;
`;