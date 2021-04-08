
import styled from "styled-components";
import { BirthdayData } from "../../../interface";

interface TargetUserProps {
    birthdayUser : BirthdayData[];
};

export function TargetUser({ birthdayUser } :TargetUserProps) {
    return <div>
        생일자
        {birthdayUser.map(user => <User key={user.nickname}>{user.nickname}</User>) }
    </div>
};

const User = styled.span`
    background-color : #CEB0D2;
    border-radius: 8px;
    padding: 3px 8px;
    margin: 0px 5px;
`;
