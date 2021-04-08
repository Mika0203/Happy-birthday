import styled from "styled-components";
import logo from '../../asset/logo.png';
import config from '../../asset/config';

interface HeaderProps{
    buttons : JSX.Element[]
}

export function Header({buttons} : HeaderProps ) {
    const onClickRegister = () => window.open(config.google);

    return <Container>
        <Logo src={logo} />
        <ButtonWrap>
            {buttons}
        </ButtonWrap>
        <ResisterBirth onClick={onClickRegister}>
            생일 등록
        </ResisterBirth>
    </Container>
}

const Logo = styled.img`
    padding: 0px 40px;
`;

const Container = styled.header`
    background-color: #7A3FC6;
    height: 50px;
    display: flex;
    flex-direction: row;
`;

const ButtonWrap = styled.span`
`;

const ResisterBirth = styled.button`
    border : 0px;
    width: 100px;
    height: 75%;
    margin-left: auto;
`;