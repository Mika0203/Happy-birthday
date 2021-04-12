import styled from "styled-components"

export function Guide(){
    return <Container>
        <h1>유캔스타 생일 파티</h1>
        매 달 한번 생일파티를 진행해요 <br/>
        해당 달의 생일자를 축하하고 <br />
        <br />
        간식은 예산 10만원 + (해당 달의 생일자 * 5000원) 이내에서 구매해요<br />
        지정한 날짜의 오후 5시 30분 쯤 진행해요<br />
    </Container>
};

const Container = styled.article`
    text-align : center;
`;