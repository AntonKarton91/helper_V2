import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./popup.module.scss"
import {Box, Tab, Tabs} from "@mui/material";


export interface PopupProps  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    closePopup: ()=>void
}


const PopupComponent = ({children, closePopup}: PopupProps): React.ReactElement => {

    return (
        <div className={styles.popupWrapper} onClick={closePopup}>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    );
};

export default PopupComponent;