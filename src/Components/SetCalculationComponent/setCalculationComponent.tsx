import React, {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from 'react';
import FileBasketComponent from "../FileBasket/FileBasketComponent";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import SetInputWindowComponent from "../SetInputWindowComponent/SetInputWindowComponent";
import {ISheet} from "../../Store/Reducers/Main/types";
import {calculationType} from "../../Pages/OrderCalculationPage";
import {ExcelClass} from "../../EXCEL/Excel";
import {ExcelCalc} from "../../EXCEL/ExcelCalc";
const fs = window.require("fs");
const {exec} = window.require('child_process');
const { spawn } = window.require('child_process');
const ks = window.require('node-key-sender');

// Чтение существующего файла Excel



const excel = window.require('excel4node');

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
        await excel.resetExcelFile()
        await excel.excelSave(sheetData.excelFilePath)
        const excelPath = "E:/Торрент/MO_2007_portable_(TA-2212)_win7-11/Microsoft Office Excel 2007.exe";

// Запуск программы Excel и открытие файла
        const excelProcess = spawn(excelPath, ["C:/Users/Anton/Desktop/IT/helper_V2/Files/745.7575236243048/Материалы Love Generation.xlsx"]);

        excelProcess.on('close', (code: any) => {
            if (code === 0) {
                console.log('Excel успешно открыт.');

                // Немного подождем, чтобы Excel успел открыть файл
                setTimeout(() => {
                    // Эмуляция нажатия горячей клавиши (например, Ctrl + S для сохранения)
                    ks.sendKey('control', () => {
                        ks.sendKey('alt', () => {
                            ks.sendKey('F9', () => {
                                console.log('Нажаты клавиши Ctrl + S для сохранения файла в Excel.');
                            });
                        });
                    });
                }, 5000); // 5 секунд задержки
            } else {
                // console.error(Excel вернул код ошибки: ${code});
            }
        });

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