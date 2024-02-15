import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import styles from "./fileBasket.module.scss"
import {Avatar} from "@mui/material";
import {fileWorker} from "../../Utils/fileWorking";
import {ISheet} from "../../Store/Reducers/Main/types";
import {changeSheetData} from "../../Store/Reducers/Main/mainSlice";

const { ipcRenderer } = window.require('electron');
const path = window.require('path');

export interface FileBasketProps {
    sheetData: ISheet
}


const FileBasketComponent = ({sheetData}: FileBasketProps): React.ReactElement => {
    const [ basketIcon, setBasketIcon ] = useState<boolean>(sheetData.fileIsUpload)
    const [ clientName, setClientName ] = useState<string>(sheetData.clientName)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        setBasketIcon(sheetData.fileIsUpload)
        setClientName(sheetData.clientName)
    }, [sheetData.id])

    const handleDrop =  async (event:any) => {
        event.preventDefault();
        event.stopPropagation();

        const filePath = fileWorker.getExcelFile(event.dataTransfer)
        if (filePath) {
            const pathTo: string = sheetData.id
            dispatch(changeSheetData({
                id: sheetData.id,
                data: {clientName: fileWorker.getClientName(filePath),
                fileIsUpload: true,
                excelFileName: fileWorker.getExcelFileName(filePath)}}))
            setClientName(fileWorker.getClientName(filePath))
            setBasketIcon(true)
            ipcRenderer.send('file-drop', filePath, pathTo);
        }
    };

    const handleDragOver = (event:any) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={styles.basketContainer}
            >
                {
                    basketIcon && <Avatar src="https://cdn1.iconfinder.com/data/icons/application-file-formats/128/microsoft-excel-512.png" />
                }
                <div>{ clientName }</div>
            </div>
        </div>
    );
};

export default FileBasketComponent;