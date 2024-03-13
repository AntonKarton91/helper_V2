import {calculationType} from "../../../Pages/OrderCalculationPage";
import {IInputSetArray} from "../../../Utils/setWorkers";

export interface IMainState {
    inputSetArray: IInputSetArray[]
    appStatus: {
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

