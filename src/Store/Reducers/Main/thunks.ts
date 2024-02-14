import {createAsyncThunk} from "@reduxjs/toolkit";

import {calculationType} from "../../../Pages/OrderCalculationPage";
import {fileWorker} from "../../../Utils/fileWorking";



export const addSheet = createAsyncThunk<{status: boolean, message: string, type: calculationType, id: string},
    {type: calculationType}, {rejectValue: string}>(
    'main/addSheet',
// @ts-ignore
    async function ({dirPath, type}, { rejectWithValue }) {
        const id = String(Math.random() * 1000)
        const data = await fileWorker.createFolder("Files/" + id)
        if (data.status) {
            return {...data, type, id}
        }
        else return rejectWithValue(data.message)
    }
);