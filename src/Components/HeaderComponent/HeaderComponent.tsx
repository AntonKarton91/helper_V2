import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./layout.module.scss"
export interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}



const LayoutComponent = ({children}: LayoutProps): React.ReactElement => {
    return (
        <div
            className={styles.container}
            style={{backgroundImage: "url('https://img3.goodfon.ru/wallpaper/nbig/7/4e/dodge-challenger-srt-mopar.jpg')"}}
        >
            <div className={styles.header}>
                {/*<HeaderComponent/>*/}
            </div>
            <div className={styles.content} >
                {children}
            </div>
        </div>
    );
};

export default LayoutComponent;