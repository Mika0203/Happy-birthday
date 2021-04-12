import { useRef } from "react";

interface PhotoInputProps {
    onChangeFileList? : Function ;
    onChangeFileURL? : Function;
    buttonTitle : string;
};

export function PhotoInput({onChangeFileList, onChangeFileURL, buttonTitle } : PhotoInputProps){
    const input = useRef<HTMLInputElement>(null);

    const onUploadPhoto = (e: React.ChangeEvent) => {
        const file = e.target as HTMLInputElement;
        if (file?.files) {
            onChangeFileList && onChangeFileList(Array.from(file.files));
            return Array.from(file.files).forEach(file => {
                const fr = new FileReader();
                fr.onload = () => {
                    if (fr.result) {
                        const str = fr.result.toString();
                        if (str)
                            onChangeFileURL && onChangeFileURL((e : string[]) => e.concat(str));
                    }
                };
                fr.readAsDataURL(file);
            })
        }
    };

    return <>
        <input ref={input} hidden onChange={onUploadPhoto} type='file' multiple />
        <button onClick={() => input.current?.click()}>
            {buttonTitle}
        </button>
    </>
};