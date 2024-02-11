import {configureStore} from '@reduxjs/toolkit'
import { AppState } from './types'
import mainReducer from "./Reducers/Main/mainSlice";




export const store = configureStore<AppState>({
    reducer: {
        main: mainReducer,
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch