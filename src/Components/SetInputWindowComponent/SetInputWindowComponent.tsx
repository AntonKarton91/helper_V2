import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./setInputWindow.module.scss"
import {Button} from "@mui/material";
import ShelfComponent from "../ShelfComponent/ShelfComponent";
import {gradientSetParsing} from "../../Utils/clipboardParsers";



export interface SetInputWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{

}

export interface IShelfList {
    shelfNumber: number
    displays: {id: number, name: string, width: number, height: number}[]
}

const SetInputWindowComponent = ({}: SetInputWindowProps): React.ReactElement => {
    const [displayList, setDisplayList] = useState<IShelfList[]>([])

    const inputExcelDataHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const inputData = await gradientSetParsing()


    //     event.preventDefault()
    //     setDisplayList([
    //         { shelfNumber: 1, displays: [
    //                 {id: 1, name: "string", width: 200, height: 200},
    //                 {id: 2, name: "string2", width: 200, height: 200},
    //                 {id: 3, name: "", width: 0, height: 200},
    //                 {id: 4, name: "string3", width: 200, height: 200},
    //                 {id: 3, name: "", width: 0, height: 200}
    //             ]},
    //         { shelfNumber: 2, displays: [
    //                 {id: 1, name: "string", width: 200, height: 200},
    //                 {id: 2, name: "string2", width: 200, height: 200},
    //                 {id: 3, name: "", width: 0, height: 200},
    //                 {id: 4, name: "string3", width: 200, height: 200},
    //                 {id: 3, name: "", width: 0, height: 200}
    //             ]}
    //     ])
    }
    const pallet = {name: "pal", width: 650, depth: 250}


    return (
        <div className={styles.container}>
            <Button variant="contained" color="success" onClick={inputExcelDataHandler}>ВВОД</Button>
            { displayList.length>0 &&
                displayList.map((shelf, i)=> {
                    return <ShelfComponent shelfNumber={shelf.shelfNumber} displayList={shelf.displays} pallet={pallet}/>
                })}
        </div>
    );
}

export default SetInputWindowComponent