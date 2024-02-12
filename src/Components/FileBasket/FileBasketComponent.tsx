import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import styles from "./fileBasket.module.scss"
import {Avatar} from "@mui/material";

const { ipcRenderer } = window.require('electron');
const path = window.require('path');

export interface FileBasketProps {

}


const FileBasketComponent = ({}: FileBasketProps): React.ReactElement => {
    const [ basketTitle, setBasketTitle ] = useState<string>("Перетащите файлы сюда для загрузки")
    const [ basketIcon, setBasketIcon ] = useState<boolean>(false)
    const { sheetList, appStatus } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()

    const handleDrop = (event:any) => {
        event.preventDefault();
        event.stopPropagation();

        const files = Array.from(event.dataTransfer.files);
        // @ts-ignore
        const filePaths = files.map(file => file.path);
        const splittedPAth = filePaths[0].split("\\")
        setBasketTitle(splittedPAth[splittedPAth.length-3])
        setBasketIcon(true)
        // if (files.length > 0) {
        //     ipcRenderer.send('file-drop', files);
        // }
        ipcRenderer.send('file-drop', filePaths);
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