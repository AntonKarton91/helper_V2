import React, {useState} from "react";
import {HashRouter, NavLink, Route} from "react-router-dom";
import {Button} from "@mui/material";
const { ipcRenderer } = window.require('electron');

function HomePage() {
    const [path, setPath] = useState(__dirname)
    const handleDrop = (event:any) => {
        event.preventDefault();
        event.stopPropagation();

        const files = Array.from(event.dataTransfer.files);
        // @ts-ignore
        const filePaths = files.map(file => file.path);
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
            <div>HomePage</div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ width: '100%', height: '200px', border: '2px dashed #ccc' }}
            >
                <p style={{ textAlign: 'center', marginTop: '80px' }}>Перетащите файлы сюда для загрузки</p>
            </div>
        </div>

);
}
export default HomePage