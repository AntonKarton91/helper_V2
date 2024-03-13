import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./setInputWindow.module.scss"
import {Button} from "@mui/material";
import ShelfComponent from "../ShelfComponent/ShelfComponent";
import {excelBufferParsing} from "../../Utils/clipboardParsers";
import {getSetArray, IInputSetArray} from "../../Utils/setWorkers";
import CellComponent from "../UIComponents/CellComponent/CellComponent";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import {addInputSetArray} from "../../Store/Reducers/Main/mainSlice";


export interface SetInputWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{

}


const SetInputWindowComponent = ({}: SetInputWindowProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const { inputSetArray } = useAppSelector(state => state.main)
    // const [displayList, setDisplayList] = useState<IInputSetArray[]>([])

    const inputExcelDataHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const a = await excelBufferParsing()
        // setDisplayList(await getSetArray(a))
        dispatch(addInputSetArray(await getSetArray(a)))

    }

    const deleteRow = () => {

    }


    return (
        <div>
            <Button variant="contained" color="success" onClick={inputExcelDataHandler}>ВВОД</Button>
            <div className={styles.container}>
                {
                    inputSetArray &&
                    inputSetArray.map(d=> {
                        return (
                            <div className={styles.row}>
                                <DeleteForeverIcon onClick={()=>deleteRow()}/>
                                <CellComponent val={d.displayArticul} isProblem={false}/>
                                <CellComponent val={d.displayCount} isProblem={true}/>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    );
}

export default SetInputWindowComponent