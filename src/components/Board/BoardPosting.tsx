import { useState } from "react";
import { SelectDate } from "./Posting/SetDate";
import { UploadSnack, SnackProps } from "./Posting/SetSnack";
import { TargetUser } from "./Posting/SetTargetUser";

import styled from "styled-components"
import { BirthdayData } from "../../interface";
import { useEffect } from "react";
import { Description } from "./Posting/SetDescription";
import { UploadPhoto } from "./Posting/SetPhoto";

interface BoardPostingProps {
    birthData : BirthdayData[];
    posting : Function;
};


export function BoardPosting({birthData, posting} : BoardPostingProps) {
    const [date, setDate] = useState<Date>();
    const [snackList, setSnackList] = useState<SnackProps[]>([]);
    const [birthList, setBirthList] = useState<BirthdayData[]>([]);
    const [photoList, setPhotoList] = useState<File[]>([]);
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        if(date){
            const month = date.getMonth() + 1;
            const filterd = birthData.filter(data =>parseInt(data.realBirthday.split('.')[1]) === month);
            setBirthList(filterd)
        }
    },[date, birthData]);

    const onClickUpload = () => {
        if(!date){
            alert("행사 실시 일자를 선택해주세요");
            return;
        };

        if(!window.confirm('포스팅하시겠어요?')){
            return;
        };

        const frm = new FormData();
        photoList.forEach(photo => {frm.append('photo', photo)});

        const data = {date,snackList, birthList, description};
        frm.append('data', JSON.stringify(data));
        posting(frm,data);
    };

    return <Container>
        <Divide>
            <SelectDate birthData={birthData} setDate={setDate}/>
        </Divide>

        <Divide>
            <TargetUser birthdayUser={birthList} />
        </Divide>

        <Divide>
            <UploadSnack 
                setSnackList={setSnackList}
                snackList={snackList}
            />
        </Divide>

        <Divide>
            <UploadPhoto photoFileList={photoList} setPhotoList={setPhotoList} />
        </Divide>

        <Divide>
            <Description setValue={setDescription} value={description} />
        </Divide>

        <UploadButton onClick={onClickUpload}>
            업로드
        </UploadButton>
    </Container>
};

const Container = styled.div`
    flex: 1;
    padding: 25px;
    overflow: auto;
`;

const UploadButton = styled.button`
    width: 200px;
    height: 50px;
    position: relative;
    float: right;
    margin: 10px;
`;

const Divide = styled.div`
    padding: 10px 0px;
    border-bottom : 1px solid #CEB0D2;
    display: flex;
`;