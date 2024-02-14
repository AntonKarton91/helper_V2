import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
// @ts-ignore
import styles from "./style.module.css"

export interface cellProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>  {
    // onChange: ()=>void
    value: string | number
}

const CellComponent= ({value}:cellProps): React.ReactElement => {

    return <div className={styles.cell}>{value}</div>;
};

export default CellComponent;