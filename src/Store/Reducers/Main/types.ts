import {calculationType} from "../../../Pages/OrderCalculationPage";

export interface IMainState {
    sheetList: ISheet[]
    appStatus: {
        isLoading: boolean
        isError: boolean,
        message: string
    }
}

export interface ISheet {
    name: string,
    type: calculationType
}

