import {createAsyncThunk} from "@reduxjs/toolkit";

import {calculationType} from "../../../Pages/OrderCalculationPage";
import {fileWorker} from "../../../Utils/fileWorking";



export const addSheet = createAsyncThunk<{status: boolean, message: string, type: calculationType}, {dirPath: string, type: calculationType}, {rejectValue: string}>(
    'main/addSheet',
// @ts-ignore
    async function ({dirPath, type}, { rejectWithValue }) {
        const data = await fileWorker.createFolder(dirPath)
        if (data.status) {
            console.log(type)
            return {...data, type}
        }
        else return rejectWithValue(data.message)
    }
);