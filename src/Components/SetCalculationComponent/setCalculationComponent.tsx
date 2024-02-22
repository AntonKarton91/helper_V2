import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import FileBasketComponent from "../FileBasket/FileBasketComponent";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import SetInputWindowComponent from "../SetInputWindowComponent/SetInputWindowComponent";
import {ISheet} from "../../Store/Reducers/Main/types";
import {calculationType} from "../../Pages/OrderCalculationPage";
import {ExcelClass} from "../../EXCEL/Excel";



export interface SetCalculationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id: string
}

const SetCalculationComponent = ({id}: SetCalculationProps): React.ReactElement => {
    const { sheetList, appStatus } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    const [sheetData, setSheetData] = useState<ISheet>({
        id: "",
        name: "",
        type: calculationType.Set,
        fileIsUpload: false,
        clientName: "",
        excelFileName: "",
        excelFilePath: ""
    })

    useEffect(()=> {
        const s = sheetList.find(s=>s.id === id)
        if (s) {
            setSheetData(s)
        }
    }, [sheetList])


    const click = async () => {
        const excel = new ExcelClass()
        await excel.sheetInit(sheetData.excelFilePath)
        await excel.resetExcelFile(sheetData.excelFilePath)
        await excel.excelSave(sheetData.excelFilePath)
    }

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

    return (
        <div>
            <button onClick={click}>aaa</button>
            setCalculationComponent id={id}
            <SetInputWindowComponent/>
            <FileBasketComponent sheetData={sheetData}/>

        </div>
    );
}

export default SetCalculationComponent;