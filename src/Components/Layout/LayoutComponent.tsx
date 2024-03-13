import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./layout.module.scss"
import {Alert, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import SetCalculationComponent from "../SetCalculationComponent/setCalculationComponent";
import ShelfCalculationComponent from "../ShelfCalculationComponent/setCalculationComponent";


export interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}


export enum CalcType {
    matCalculation,
    shelfCalculation
}


const LayoutComponent = ({children}: LayoutProps): React.ReactElement => {
    const [calculationType, setCalculationType] = useState<CalcType>(CalcType.shelfCalculation)
    const dispatch = useAppDispatch()
    const { appStatus } = useAppSelector(state => state.main)


    return (
        <div
            className={styles.container}
            style={{backgroundImage: "url('https://kartinki.pics/pics/uploads/posts/2022-08/1660018600_11-kartinkin-net-p-fon-dlya-programmi-krasivo-11.jpg')"}}
        >
            <div className={styles.content} >
                <div style={{display: calculationType === CalcType.matCalculation ? "block" : "none"}}>
                    <SetCalculationComponent/>
                </div>
                <div style={{display: calculationType === CalcType.shelfCalculation ? "block" : "none"}}>
                    <ShelfCalculationComponent/>
                </div>
            </div>

            <div className={styles.selectCalcTypeButtonBlock}>
                <Button
                    variant="contained"
                    color={"success"}
                    onClick={()=>setCalculationType(CalcType.shelfCalculation)}
                >
                    Расчет полок
                </Button>
                <Button
                    variant="contained"
                    color={"primary"}
                    onClick={()=>setCalculationType(CalcType.matCalculation)}
                >
                    Расчет материалов комплекта
                </Button>
            </div>


            <div>
                {
                    appStatus.isError &&
                    <Alert variant="filled" severity="error">
                        {appStatus.message}
                    </Alert>
                }

            </div>

        </div>
    );




};

export default LayoutComponent;