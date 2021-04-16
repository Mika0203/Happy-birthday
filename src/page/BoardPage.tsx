import { BirthdayData } from "../interface";
import { Board } from '../components/Board';
interface BoardPageProps {
    birthData: BirthdayData[];
};

export default function BoardPage({ birthData }: BoardPageProps) {
    return <Board birthData={birthData} />
};