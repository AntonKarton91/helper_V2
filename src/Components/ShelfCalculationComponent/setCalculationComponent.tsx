import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import FileBasketComponent, {IBasketStatus} from "../FileBasket/FileBasketComponent";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import SetInputWindowComponent from "../SetInputWindowComponent/SetInputWindowComponent";
import {ISheet} from "../../Store/Reducers/Main/types";
import {calculationType} from "../../Pages/OrderCalculationPage";
import {ExcelClass} from "../../EXCEL/Excel";
import {CalcType} from "../Layout/LayoutComponent";



export interface ShelfCalculationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

const ShelfCalculationComponent = ({}: ShelfCalculationProps): React.ReactElement => {
    const { sheetList, appStatus } = useAppSelector(state => state.main)
    const [clientName, setClientName] = useState<string>("")
    const [excelFileName, setExcelFileName] = useState<string>("")
    const [excelFilePath, setExcelFilePath] = useState<string>("")




    // const click = async () => {
    //     const excel = new ExcelClass()
    //     await excel.sheetInit(sheetData.excelFilePath)
    //     await excel.resetExcelFile(sheetData.excelFilePath)
    //     await excel.excelSave(sheetData.excelFilePath)
    //     const child = await spawn("C:\\Program Files (x86)\\Microsoft Office\\Office16\\EXCEL.EXE", [sheetData.excelFilePath])
    //     setTimeout(async ()=> {
    //         robot.keyTap('s', ['control']);
    //     }, 200)
    //     setTimeout(async ()=> {
    //         child.kill()
    //
    //         const excel1 = new ExcelClass()
    //         await excel1.sheetInit(sheetData.excelFilePath)
    //         await excel1.aa()
    //         // ks.sendCombination(['control', 's']);
    //     }, 300)




    // }

    const fileUploadHandler = ({clientName, excelFilePath, excelFileName}:IBasketStatus) => {
        setClientName(clientName)
        setExcelFileName(excelFilePath)
        setExcelFilePath(excelFileName)
    }

    return (
        <div>
            <SetInputWindowComponent/>
            <FileBasketComponent
                type={CalcType.shelfCalculation}
                clientName={clientName}
            excelFileName={excelFileName}
            fileUploadHandler={fileUploadHandler}/>

        </div>
    );
}

export default ShelfCalculationComponent;