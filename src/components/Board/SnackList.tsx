export interface Snack {
    id: string;
    name: string;
    number: number;
    price: number;
};

interface SnackListContianerProps {
    snackList: Snack[];
};

export default function SnackListContainer({ snackList }: SnackListContianerProps) {
    return snackList.length === 0
        ? <></>
        : <>
            {
                snackList.map(snack => <tr key={snack.id}>
                    <td>{snack.name}</td>
                    <td>{snack.price}</td>
                    <td>{snack.number}</td>
                    <td>{snack.price * snack.number}</td>
                </tr>)
            }
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        {snackList.reduce((a,b) => a + b.price * b.number ,0)}
                    </td>
                </tr>
        </>
};
