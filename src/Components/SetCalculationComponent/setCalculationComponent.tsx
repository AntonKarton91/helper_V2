import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import FileBasketComponent, {IBasketStatus} from "../FileBasket/FileBasketComponent";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import SetInputWindowComponent from "../SetInputWindowComponent/SetInputWindowComponent";
import {ISheet} from "../../Store/Reducers/Main/types";
import {calculationType} from "../../Pages/OrderCalculationPage";
import {ExcelClass} from "../../EXCEL/Excel";
import {CalcType} from "../Layout/LayoutComponent";
import {Button} from "@mui/material";
import styles from "./setCalculation.module.scss"



export interface SetCalculationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const SetCalculationComponent = ({}: SetCalculationProps): React.ReactElement => {
    const { inputSetArray } = useAppSelector(state => state.main)
    const [clientName, setClientName] = useState<string>("")
    const [excelFileName, setExcelFileName] = useState<string>("")
    const [excelFilePath, setExcelFilePath] = useState<string>("")


    const click = async () => {
        const excel = new ExcelClass()
        await excel.sheetInit(excelFilePath)
        await excel.resetExcelFile(excelFilePath)
        await excel.excelSave(excelFilePath)
    }
    const click1 = async () => {
        try {
            const excel = new ExcelClass()
            await excel.sheetInit(excelFilePath)
            await excel.changeExcelWithSet(excelFilePath, inputSetArray)
            await excel.excelSave(excelFilePath)
        }
        catch (e) {
            console.log(111)
        }

    }


    const fileUploadHandler = (clientName: string, excelFilePath: string, excelFileName: string) => {
        setClientName(clientName)
        setExcelFileName(excelFileName)
        setExcelFilePath(excelFilePath)
    }

    return (
        <div className={styles.container}>


            <div className={styles.inputWindow}>
                Окно ввода
                <SetInputWindowComponent/>
            </div>
            <div className={styles.controlWindow}>

                    {
                        clientName ? <div className={styles.buttonBlock}>
                            <Button
                                color={"primary"}
                                size={"small"}
                                variant={"contained"}
                                onClick={click}
                            >Обнулить</Button>
                            <Button
                                color={"primary"}
                                size={"small"}
                                variant={"contained"}
                                onClick={click1}
                            >Расчитать</Button>
                        </div> : <div>Добавьте файл</div>
                    }
                <FileBasketComponent
                    type={CalcType.matCalculation}
                    clientName={clientName}
                    excelFileName={excelFileName}
                    fileUploadHandler={fileUploadHandler}
                />
            </div>




        </div>
    );
}

export default SetCalculationComponent;