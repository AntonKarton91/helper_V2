import {createAsyncThunk} from "@reduxjs/toolkit";
import {createFolder} from "../../../Utils/fileWorking";
import {calculationType} from "../../../Pages/OrderCalculationPage";



export const addSheet = createAsyncThunk<{status: boolean, message: string, type: calculationType}, {dirPath: string, type: calculationType}, {rejectValue: string}>(
    'main/addSheet',
// @ts-ignore
    async function ({dirPath, type}, { rejectWithValue }) {
        const data = await createFolder(dirPath)
        if (data.status) {
            return {...data, type}
        }
        else rejectWithValue(data.message)
    }
);