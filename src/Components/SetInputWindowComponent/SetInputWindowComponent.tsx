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
import {addInputSetArray, changeRowInputSetArray, deleteRowInputSetArray} from "../../Store/Reducers/Main/mainSlice";


export interface SetInputWindowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{

}


const SetInputWindowComponent = ({}: SetInputWindowProps): React.ReactElement => {
    const dispatch = useAppDispatch()
    const { inputSetArray } = useAppSelector(state => state.main)
    const [ basketIsHover, setBasketIsHover ] = useState<number>(0)
    // const [displayList, setDisplayList] = useState<IInputSetArray[]>([])

    const inputExcelDataHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const a = await excelBufferParsing()
        dispatch(addInputSetArray(await getSetArray(a)))

    }

    const deleteRow = (rowIndex: number) => {
        dispatch(deleteRowInputSetArray(rowIndex))
    }

    const changeRow = (newVal: string | number, index: number, type: string) => {
        dispatch(changeRowInputSetArray({newVal, index, type}))
    }


    return (
        <div>
            <Button variant="contained" color="success" onClick={inputExcelDataHandler}>ВВОД</Button>
            <div className={styles.container}>
                {
                    inputSetArray &&
                    inputSetArray.map(d=> {
                        return (
                            <div className={styles.row} key={d.index}>
                                <div
                                    onMouseEnter={()=>setBasketIsHover(d.index)}
                                    onMouseLeave={()=>setBasketIsHover(0)}
                                >
                                    <DeleteForeverIcon
                                        onClick={()=>deleteRow(d.index)}
                                        color={d.index === basketIsHover ? "secondary" : "primary"}
                                    />
                                </div>
                                <CellComponent
                                    changeValueHandler={(newVal)=>changeRow(newVal, d.index, "art")}
                                    val={d.displayArticul}
                                    allowOnlyNumbers={false}
                                />
                                <CellComponent changeValueHandler={(newVal)=>changeRow(newVal, d.index, "count")}
                                    val={d.displayCount}
                                    allowOnlyNumbers={true}
                                />
                            </div>
                        )

                    })
                }
            </div>
        </div>
    );
}

export default SetInputWindowComponent