import React, {DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import FileBasketComponent from "../FileBasket/FileBasketComponent";
import {useAppDispatch, useAppSelector} from "../../Store/hooks";
import SetInputWindowComponent from "../SetInputWindowComponent/SetInputWindowComponent";

export interface SetCalculationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    id: string
}

const SetCalculationComponent = ({id}: SetCalculationProps): React.ReactElement => {
    const { sheetList, appStatus } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()

    return (
        <div>
            setCalculationComponent id={id}
            <SetInputWindowComponent/>
            <FileBasketComponent/>

        </div>
    );
}

export default SetCalculationComponent;