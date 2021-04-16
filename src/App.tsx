import api from './api';
import styled from 'styled-components';

import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import { BirthdayData } from './interface';
import { GlobalStyle } from './globalstyle';

import CalendarPage from './page/CalendarPage';
import BoardPage from './page/BoardPage';
import GuidePage from './page/GuidePage';

enum ViewType {
  CALENDAR,
  BOARD,
  GUIDE
};

interface ButtonProps {
  Label: string;
  Type: ViewType;
};

const buttonList: ButtonProps[] = [
  {
    Label: '달력',
    Type: ViewType.CALENDAR,
  },
  {
    Label: '게시판',
    Type: ViewType.BOARD
  },
  {
    Label: '가이드',
    Type: ViewType.GUIDE
  },
];

function App() {
  const [currentType, setCurrentType] = useState<ViewType>(ViewType.CALENDAR);
  const [birthData, setBirthData] = useState<BirthdayData[]>([]);

  useEffect(() => {
    api.getBirthData().then(res => {
      const birthdayData: BirthdayData[] = res.data.map((birth: Array<string>) => {
            const data: BirthdayData = {
              name: birth[0],
              nickname: birth[1],
              birthday: birth[2],
              type: birth[3],
              realBirthday: birth[4]
            };
            return data;
          });
          setBirthData(birthdayData);
    });
  }, []);

  const makeButton = (): JSX.Element[] => {
    return buttonList.map(button =>
      <Button key={button.Label} onClick={() => setCurrentType(button.Type)}>
        {button.Label}
      </Button>
    )
  };

  let lender = null;

  switch(currentType){
    case ViewType.CALENDAR :
      lender = <CalendarPage birthData={birthData} />;
      break;
    case ViewType.BOARD :
      lender = <BoardPage birthData={birthData} />;
      break;
    case ViewType.GUIDE :
      lender = <GuidePage />;
      break;

  }

  return (
    <Container>
      <GlobalStyle />
      <Header buttons={makeButton()} />
      {lender}
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  color: white;
  outline: 0px;
  padding : 0px;
  height: 100%;
  width: 100px;
  margin : 0px;
  background-color: unset;
  &:hover{
    background-color: rgba(0,0,0,0.1);
  }
`;

export default App;
