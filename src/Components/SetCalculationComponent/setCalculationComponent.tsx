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
        excelFileName: ""
    })

    useEffect(()=> {
        const s = sheetList.find(s=>s.id === id)
        if (s) {
            setSheetData(s)
        }
    }, [sheetList])


    const click = () => {
        // console.log(11, sheetData.excelFileName)
        const excel = new ExcelClass()
        excel.getCell1("Files/" + sheetData.id + "/" + sheetData.excelFileName)
    }

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