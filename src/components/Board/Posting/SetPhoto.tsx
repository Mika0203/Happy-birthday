import { useRef, useState } from "react";
import styled from "styled-components";

interface PhotoProps {
    photoFileList: File[];
    setPhotoList: Function;
};

export function UploadPhoto({ photoFileList, setPhotoList }: PhotoProps) {
    const input = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<string[]>([]);

    const onUploadPhoto = (e: React.ChangeEvent) => {
        const file = e.target as HTMLInputElement;
        if (file?.files) {
            setPhotoList(Array.from(file.files));
            

            return Array.from(file.files).forEach(file => {
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
