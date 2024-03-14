import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import styles from "./cell.module.scss"


export interface CellProps  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    val: string | number
    allowOnlyNumbers: boolean
    changeValueHandler: (newVal: number | string) => void
}


const CellComponent = ({val, allowOnlyNumbers, changeValueHandler}: CellProps): React.ReactElement => {
    const [localValue, setLocalValue] = useState(val)
    const [isProblem, setIsProblem] = useState(false)

    useEffect(()=>{
        if (allowOnlyNumbers && val<=0) {
            setIsProblem(true)
        }
    }, [])


    const changeValHandler = (e) => {
        const result = allowOnlyNumbers ? e.target.value.replace(/\D/g, '') : e.target.value
        if (allowOnlyNumbers && result<=0) {
            setIsProblem(true)
        }
        else setIsProblem(false)
        if (localValue != result) {
            e.target.style.height = "auto"
            e.target.style.height = `${e.target.scrollHeight}px`
        }
        if (typeof result === "string") {
            setLocalValue(result)
            changeValueHandler(result)
        }


    }

    return (
        <textarea
            value={localValue}
            onChange={(e)=>changeValHandler(e)}
            className={styles.container}
            style={{backgroundColor: isProblem ? "red" : "white"}}
        />
    );
};

export default CellComponent;