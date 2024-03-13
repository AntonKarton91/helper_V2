import * as React from "react";
import {useAppDispatch} from "../../Store/hooks";
import styles from "./fileBasket.module.scss"
import {Avatar} from "@mui/material";
import {fileWorker} from "../../Utils/fileWorking";
import {CalcType} from "../Layout/LayoutComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const { ipcRenderer } = window.require('electron');
const path = window.require('path');

export interface IBasketStatus {
    clientName: string,
    excelFilePath: string,
    excelFileName: string
}

export interface FileBasketProps {
    type: CalcType
    clientName: string,
    excelFileName: string
    fileUploadHandler: (clientName: string, excelFilePath: string, excelFileName: string)=>void
}


const FileBasketComponent = ({clientName, type, excelFileName, fileUploadHandler}: FileBasketProps): React.ReactElement => {
    const dispatch = useAppDispatch()

    const handleDrop =  async (event:any) => {
        event.preventDefault();
        event.stopPropagation();

        const filePath = fileWorker.getExcelFile(event.dataTransfer)
        if (filePath) {
            const pathTo: string = type === CalcType.matCalculation ? "MatCalc" : "ShelfCalc"
            const exFileName = fileWorker.getExcelFileName(filePath)
            fileUploadHandler(fileWorker.getClientName(filePath),
                "Files/" + pathTo + "/" + exFileName,
                exFileName
            )
            ipcRenderer.send('file-drop', filePath, pathTo);
        }
    };

    const handleDragOver = (event:any) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className={styles.basketContainer}
            >
                {
                    clientName ? <Avatar
                        src="https://cdn1.iconfinder.com/data/icons/application-file-formats/128/microsoft-excel-512.png"
                    /> : <CloudUploadIcon/>
                }
                <div>{ clientName }</div>
            </div>
    );
};

export default FileBasketComponent;