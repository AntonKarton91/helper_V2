import {calculationType} from "../../../Pages/OrderCalculationPage";

export interface IMainState {
    sheetList: ISheet[]
    appStatus: {
        activeSheet: string
        isLoading: boolean
        isError: boolean,
        message: string
    }
}

export interface ISheet {
    id: string,
    name: string,
    type: calculationType
    fileIsUpload: boolean
    clientName: string
    excelFileName: string
    excelFilePath: string
}

