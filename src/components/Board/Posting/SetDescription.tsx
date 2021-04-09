import styled from "styled-components";

interface DesciprtionProps {
    value : string;
    setValue : Function;
}

export function Description({value, setValue} : DesciprtionProps) {
    return <TextArea value={value} onChange={e => setValue(e.target.value)}>
    </TextArea>
}

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
`;