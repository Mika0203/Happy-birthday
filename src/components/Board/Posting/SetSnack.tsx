import { useState } from "react";
import styled from "styled-components";

export interface SnackProps {
    name : string;
    number : number;
    price : number;
    id : string;
}

interface UploadSnackProps {
    snackList : SnackProps[];
    setSnackList : Function;
}

export function UploadSnack({snackList, setSnackList} : UploadSnackProps) {
    const [name, setname] = useState<string>('');
    const [number, setNumber] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    
    const onClickPlus = () => {
        const id = (Math.random() * 1000000).toFixed(0);
        const newSnack : SnackProps = {
            id,
            name,
            number,
            price
        };

        setSnackList((e : SnackProps[]) => e.concat(newSnack));
        setname('');
        setNumber(0);
        setPrice(0);
    };

    const onClickDelete = (delSnack : SnackProps) => {
        setSnackList((e : SnackProps[]) => e.filter(snack => snack.id !== delSnack.id));
    };

    const parse = (value : string, prev : number) => {
        const p = parseInt(value);
        return isNaN(p) ? prev : p;
    };

    return <div>
        간식
        <div>
            <span>
                이름
                <input value={name} onChange={e => setname(e.target.value)}/>
            </span>
            <span>
                갯수
                <Number value={number} onChange={e => setNumber(prev => parse(e.target.value, prev))}/>
            </span>
            <span>
                가격
                <Number value={price} onChange={e => setPrice(prev => parse(e.target.value, prev))}/>
            </span>
            <span onClick={onClickPlus}>
                추가
            </span>
        </div>
        <div>
            {
                snackList.map(e => <SnackItem onClickDelete={onClickDelete} key={e.id} props={e} />)
            }
        </div>
    </div>
}


const Number = styled.input`
    width: 50px;
`;

interface SnackItemProps {
    props : SnackProps;
    onClickDelete : Function;
}

function SnackItem( {props, onClickDelete} : SnackItemProps){
    return <div>
        <span>{props.name}</span>
        <span>{props.number}</span>
        <span>{props.price}</span>
        <span>{props.number * props.price}</span>
        <button onClick={() => onClickDelete(props)}>삭제</button>
    </div>
};
