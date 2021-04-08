import { useState } from "react";
import { useRef } from "react";
import { SelectDate } from "./Posting/SetDate";
import { UploadSnack, SnackProps } from "./Posting/SetSnack";
import { TargetUser } from "./Posting/SetTargetUser";

import styled from "styled-components"
import { BirthdayData } from "../../interface";
import { useEffect } from "react";

interface BoardArticleProps {
    birthData : BirthdayData[];
};


export function BoardArticle({birthData} : BoardArticleProps) {
    const [date, setDate] = useState<Date>();
    const [snackList, setSnackList] = useState<SnackProps[]>([]);
    const [birthList, setBirthList] = useState<BirthdayData[]>([]);
    const [photoList, setPhotoList] = useState();

    useEffect(() => {
        if(date){
            const month = date.getMonth() + 1;
            const filterd = birthData.filter(data =>parseInt(data.realBirthday.split('.')[1]) === month);
            setBirthList(filterd)
        }
    },[date]);

    const onClickUpload = () => {
        console.log(date,snackList, photoList,birthList);
    };

    const addSnack = (snack : SnackProps) => {
        setSnackList(e => e.concat(snack))
    }

    return <Container>
        <Divide>
            <SelectDate birthData={birthData} setDate={setDate}/>
        </Divide>

        <Divide>
            <TargetUser birthdayUser={birthList} />
        </Divide>

        <Divide>
            <UploadSnack 
                addSnack={addSnack}
                snackList={snackList}
            />
        </Divide>

        <Divide>
            <UploadPhoto />
        </Divide>

        <Divide>
            <Description />
        </Divide>

            <UploadButton onClick={onClickUpload}>
                업로드
            </UploadButton>
    </Container>
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 25px;
`;

const UploadButton = styled.button`

    width: 200px;
    height : 50px;
    margin-right: 10px;
    margin-left: auto;
    margin-top: auto;
`;

const Divide = styled.div`
    padding: 10px 0px;
    border-bottom : 1px solid;
    display: flex;
`;

const DivideTitle = styled.span`
    padding: 5px;
`;


function UploadPhoto() {
    const input = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<string[]>([]);

    const onUploadPhoto = (e: React.ChangeEvent) => {
        const file = e.target as HTMLInputElement;
        if (file?.files) {
            return Array.from(file.files).map(file => {
                const fr = new FileReader();
                fr.onload = () => {
                    if (fr.result) {
                        const str = fr.result.toString();
                        if (str)
                            setFiles(e => e.concat(str));
                    }
                };
                fr.readAsDataURL(file);
            })
        }
    };

    return <div>
        <input ref={input} hidden onChange={onUploadPhoto} type='file' multiple />
        사진 업로드
        <button onClick={() => input.current?.click()}>
            사진 찾기
        </button>
        <PhotoList>
            {
                files.map(e => <Photo key={e} src={e} />)
            }
        </PhotoList>
    </div>
};

const Photo = styled.img`
`;

const PhotoList = styled.div`
    img{
        width: 150px;
        margin: 5px
    }
`;

function Description() {
    return <input />
}