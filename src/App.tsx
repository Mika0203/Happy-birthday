import { Header } from './components/Header';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CalendarPage from './page/CalendarPage';
import BoardPage from './page/BoardPage';
import { BirthdayData } from './interface';
import { GlobalStyle } from './globalstyle';

import api from './api';

enum ViewType {
  CALENDAR,
  BOARD
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
  }
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
      <Button onClick={() => setCurrentType(button.Type)}>
        {button.Label}
      </Button>
    )
  }

  return (
    <Container>
      <GlobalStyle />
      <Header buttons={makeButton()} />
      {
        currentType === ViewType.CALENDAR
          ? <CalendarPage birthData={birthData} />
          : <BoardPage birthData={birthData} />
      }
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
