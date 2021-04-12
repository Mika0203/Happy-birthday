import { useRef, useState } from "react";
import { PhotoInput } from '../../PhotoInput';
import styled from "styled-components";

interface PhotoProps {
    setPhotoList: Function;
};

export function UploadPhoto({ setPhotoList }: PhotoProps) {
    const [files, setFiles] = useState<string[]>([]);
    return <div>
        <PhotoInput 
            buttonTitle='사진 업로드'
            onChangeFileList={setPhotoList}
            onChangeFileURL={setFiles}/>
        <PhotoList>
            {files.map(e => <Photo key={e} src={e} />)}
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
