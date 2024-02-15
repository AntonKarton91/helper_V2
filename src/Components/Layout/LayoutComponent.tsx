import * as React from "react";
import {DetailedHTMLProps, HTMLAttributes, useState} from "react";
import styles from "./layout.module.scss"
import {calculationType} from "../../Pages/OrderCalculationPage";
import PopupComponent from "../UIComponents/Popup/PopupComponent";
import {Alert, Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import {addSheet} from "../../Store/Reducers/Main/thunks";
import {setActiveSheet} from "../../Store/Reducers/Main/mainSlice";


export interface LayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {

}





const LayoutComponent = ({children}: LayoutProps): React.ReactElement => {
    const [popupIsActive, setPopupIsActive] = useState<boolean>(false)
    const { sheetList, appStatus } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()


    const crateSheet = (type: calculationType) => {
        dispatch(addSheet({type}))
    }

    const clickHandler = (id: string) => {
        dispatch(setActiveSheet(id))
    }

    return (
        <div
            className={styles.container}
            style={{backgroundImage: "url('https://kartinki.pics/pics/uploads/posts/2022-08/1660018600_11-kartinkin-net-p-fon-dlya-programmi-krasivo-11.jpg')"}}
        >
            <div className={styles.content} >
                {children}
            </div>
            <div className={styles.sheetPrevContainer}>
                {
                    sheetList.map(sheet => {
                        return <div
                            key={sheet.id}
                            style={{color: appStatus.activeSheet === sheet.id ? "bisque" : "white"}}
                            className={styles.sheetPrev}
                            onClick={()=>clickHandler(sheet.id)}
                        >{sheet.name}
                        </div>
                    })
                }
                <div className={styles.sheetPrev} onClick={()=>setPopupIsActive(true)}>+</div>
            </div>
            {popupIsActive &&
                <PopupComponent closePopup={()=>setPopupIsActive(false)}
                >
                    <div className={styles.popup}>
                        <Button variant="contained" onClick={()=>crateSheet(calculationType.OneByOne)}>
                            Без планограммы
                        </Button>
                        <Button variant="contained" color={"success"} onClick={()=>crateSheet(calculationType.Set)}>
                            С планограммой
                        </Button>
                        <Button variant="contained" color={"error"} onClick={()=>setPopupIsActive(false)}>
                            Отмена
                        </Button>
                    </div>
                </PopupComponent>}
            <div>
                {
                    appStatus.isError &&
                        <Alert variant="filled" severity="error">
                            {appStatus.message}
                        </Alert>
                }

            </div>
        </div>
    );




};

export default LayoutComponent;