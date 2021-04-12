import styled from "styled-components";


interface AddPhotoModalContentProps {
    urlList: string[];
    onClickCancle : Function;
    onClickSubmit : Function;
};

export function AddPhotoModalContent({ urlList,onClickCancle,onClickSubmit }: AddPhotoModalContentProps) {
    return <ModalContent>
        <h1>해당 사진을 등록하시겠어요?</h1>
        <ImageWrap>
            {urlList.map(img => <Image key={img} src={img} />)}
        </ImageWrap>

        <ButtonWrap>
            <button onClick={() => onClickSubmit()}> 등록</button>
            <button onClick={() => onClickCancle()}> 취소</button>
        </ButtonWrap>
    </ModalContent>
}


const ModalContent = styled.article`
    width: 50%;
    background-color : white;
    margin: auto;
    display: flex;
    flex-direction: column;
    >h1{
        text-align : center;
    }
`;

const Image = styled.img`
    width: 100px;
`;

const ImageWrap = styled.div`
    margin: 10px;

    >img{
        margin: 3px;
    }
`;

const ButtonWrap = styled.div`
    margin-top: auto;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;

    button:first-child{
        background-color: #CEB0D2;
    };

    >button{
        width: 40%;
        height: 50px;
    };

`;