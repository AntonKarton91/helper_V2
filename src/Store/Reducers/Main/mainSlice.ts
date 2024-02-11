import {createSlice} from '@reduxjs/toolkit'
import {IMainState, ISheet} from "./types";
import {getSheetNumber} from "../../../Utils/getSheetNumber";
import {addSheet} from "./thunks";


const initialState: IMainState = {
    sheetList: [],
    appStatus: {
        isLoading: false,
        isError: false,
        message: ""
    }
}


export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(addSheet.pending, (state) => {
                console.log(551111155)
                state.appStatus.isLoading = true
            })
            .addCase(addSheet.fulfilled, (state, action) => {
                console.log(5555)
                state.appStatus.isLoading = false
                const list = [...state.sheetList]
                const name1 = list.pop()
                const name = state.sheetList.length>0 ? "Лист " + getSheetNumber(name1?.name || "Лист 1") : "Лист 1"
                state.sheetList.push({name, type: action.payload.type})
            })
            .addCase(addSheet.rejected, (state, action) => {
                console.log(1321)
                state.appStatus.isLoading = false
                state.appStatus.isError = true
                state.appStatus.message = action.error.message || "Ошибка"

            })
    }
})

export const {

} = mainSlice.actions

export default mainSlice.reducer
