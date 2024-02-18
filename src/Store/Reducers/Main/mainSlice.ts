import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IMainState, ISheet} from "./types";
import {getSheetNumber} from "../../../Utils/getSheetNumber";
import {addSheet} from "./thunks";


const initialState: IMainState = {
    sheetList: [],
    appStatus: {
        activeSheet: "",
        isLoading: false,
        isError: false,
        message: ""
    }
}


export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setActiveSheet: (state, action) => {
            state.appStatus.activeSheet = action.payload
        },

        changeSheetData: (state, action: PayloadAction<{ data: any, id: string }>) => {
            const changedList = [...state.sheetList]
            state.sheetList = changedList.map(e=>{
                if (e.id === action.payload.id) {
                    return {...e, ...action.payload.data}
                } else return e
            })
            console.log(state.sheetList)
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(addSheet.pending, (state) => {
                state.appStatus.isLoading = true
            })
            .addCase(addSheet.fulfilled, (state, action) => {
                state.appStatus.isLoading = false
                const list = [...state.sheetList]
                const name1 = list.pop()
                const name = state.sheetList.length>0 ? "Лист " + getSheetNumber(name1?.name || "Лист 1") : "Лист 1"
                state.sheetList.push({
                    name,
                    type: action.payload.type,
                    id: action.payload.id,
                    fileIsUpload: false,
                    clientName: "Перетащите файлы для загрузки сюда",
                    excelFileName: "",
                    excelFilePath: ""
                })
                state.appStatus.activeSheet = action.payload.id
            })
            .addCase(addSheet.rejected, (state, action) => {
                state.appStatus.isLoading = false
                state.appStatus.isError = true
                state.appStatus.message = "Такая папка есть"

            })
    }
})

export const {
    setActiveSheet,
    changeSheetData
} = mainSlice.actions

export default mainSlice.reducer
