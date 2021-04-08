import { useState } from "react";

export interface SnackProps {
    name : string;
    number : number;
    price : number;
}

interface UploadSnackProps {
    snackList : SnackProps[];
    addSnack : Function;
}

export function UploadSnack({snackList, addSnack} : UploadSnackProps) {
    const [name, setname] = useState<string>('');
    const [number, setNumber] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);

    
    const onClickPlus = () => {
        addSnack({name, number, price });
        setname('');
        setNumber(0);
        setPrice(0);
    }

    return <div>
        간식
        <div>
            <span>
                이름
                <input value={name} onChange={e => setname(e.target.value)}/>
            </span>
            <span>
                갯수
                <input value={number} onChange={e => setNumber(parseInt(e.target.value))}/>
            </span>
            <span>
                가격
                <input value={price} onChange={e => setPrice(parseInt(e.target.value))}/>
            </span>
            <span onClick={onClickPlus}>
                추가
            </span>
        </div>
        <div>
            {
                snackList.map(e => <SnackItem key={e.name} props={e} />)
            }
        </div>
    </div>
}

interface SnackItemProps {
    props : SnackProps;
}

function SnackItem( {props} : SnackItemProps){
    return <div>
        <span>{props.name}</span>
        <span>{props.number}</span>
        <span>{props.price}</span>
    </div>
}