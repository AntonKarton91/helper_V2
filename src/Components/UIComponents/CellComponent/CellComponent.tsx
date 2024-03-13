import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import styles from "./cell.module.scss"


export interface CellProps  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    val: string | number
    isProblem: boolean
    changeValueHandler?: (newVal: number | string) => void
}


const CellComponent = ({val, isProblem}: CellProps): React.ReactElement => {

    return (
        <div
            className={styles.container}
            style={{backgroundColor: isProblem ? "red" : "white"}}
            contentEditable={true}
        >
            {val}
        </div>
    );
};

export default CellComponent;