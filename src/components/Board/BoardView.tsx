import styled from "styled-components"
import { useEffect } from "react";
import api from "../../api";
import { useState } from "react";
import config from "../../asset/config";


//birthList
//Date
//des
//imgs
//snackList

interface ViewProps {
    date: any,
    birthList: string[],
    description: string,
    imgs: string[],
    snackList: string[]
};

interface BoardViewProps {
    dir: number;
}

export function BoardView({ dir }: BoardViewProps) {
    const [currentViewData, setCurrentViewData] = useState<ViewProps>();

    useEffect(() => {
        api.getPost(dir).then(res => {
            console.log(res.data)
            setCurrentViewData(res.data);
        });
    }, [dir]);

    return <Container>
        view
        <ImageContainer imgsrc={currentViewData?.imgs}/>
    </Container>
    // const [date, setDate] = useState<Date>();
    // const [snackList, setSnackList] = useState<SnackProps[]>([]);
    // const [birthList, setBirthList] = useState<BirthdayData[]>([]);
    // const [photoList, setPhotoList] = useState<File[]>([]);
    // const [description, setDescription] = useState<string>('');

    // useEffect(() => {
    //     if(date){
    //         const month = date.getMonth() + 1;
    //         const filterd = birthData.filter(data =>parseInt(data.realBirthday.split('.')[1]) === month);
    //         setBirthList(filterd)
    //     }
    // },[date, birthData]);

    // const onClickUpload = () => {
    //     if(!date){
    //         alert("행사 실시 일자를 선택해주세요");
    //         return;
    //     }

    //     if(!window.confirm('포스팅하시겠어요?')){
    //         return;
    //     }

    //     const frm = new FormData();
    //     photoList.forEach(photo => {
    //         frm.append('photo', photo);
    //     })

    //     const data = {
    //         date,snackList, birthList, description
    //     };
    //     frm.append('data', JSON.stringify(data));

    //     api.posting(frm);
    //     console.log({date,snackList, photoList : frm, birthList, description});
    // };

    // return <Container>
    //     <Divide>
    //         <SelectDate birthData={birthData} setDate={setDate}/>
    //     </Divide>

    //     <Divide>
    //         <TargetUser birthdayUser={birthList} />
    //     </Divide>

    //     <Divide>
    //         <UploadSnack 
    //             setSnackList={setSnackList}
    //             snackList={snackList}
    //         />
    //     </Divide>

    //     <Divide>
    //         <UploadPhoto photoFileList={photoList} setPhotoList={setPhotoList} />
    //     </Divide>

    //     <Divide>
    //         <Description setValue={setDescription} value={description} />
    //     </Divide>

    //     <UploadButton onClick={onClickUpload}>
    //         업로드
    //     </UploadButton>
    // </Container>
};

interface ImageContainerProps {
    imgsrc : string[]|undefined
}

function ImageContainer({imgsrc} : ImageContainerProps) {
    return <div>
        {
            imgsrc?.map(src => <img src={`${config.serverURL}${src}`}/>)
        }
    </div>
}

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