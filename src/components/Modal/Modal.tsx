import React from "react";
import styled from "styled-components"

interface ModalProps{

}

export function Modal(props : React.PropsWithChildren<ModalProps>){
    return <Container>
        {props.children}
    </Container>
};

const Container = styled.div`
    position: absolute;
    left: 0;
    top : 0;
    width : 100%;
    height: 100%;
    background-color : rgba(0,0,0,0.5);
    z-index : 100000;
    display: flex;
`;
