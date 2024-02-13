import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import styles from "./fileBasket.module.scss"
import {Avatar} from "@mui/material";
import {fileWorker} from "../../Utils/fileWorking";

const { ipcRenderer } = window.require('electron');
const path = window.require('path');

export interface FileBasketProps {

}


const FileBasketComponent = ({}: FileBasketProps): React.ReactElement => {
    const [ basketTitle, setBasketTitle ] = useState<string>("Перетащите файлы для загрузки сюда")
    const [ basketIcon, setBasketIcon ] = useState<boolean>(false)
    const { sheetList, appStatus } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()

    const handleDrop =  async (event:any) => {
        event.preventDefault();
        event.stopPropagation();

        const filePath = fileWorker.getExcelFile(event.dataTransfer)
        if (filePath) {
            const pathTo: string = "123"
            await fileWorker.createFolder(`Files/${pathTo}`)
            setBasketTitle(fileWorker.getClientName(filePath))
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
                <div>{ basketTitle }</div>
            </div>
        </div>
    );
};

export default FileBasketComponent;