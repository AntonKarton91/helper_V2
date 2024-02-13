import React, {useMemo, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import OrderCalculationPage from "./Pages/OrderCalculationPage";
import {Button} from "@mui/material";
import LayoutComponent from "./Components/Layout/LayoutComponent";
import SetCalculationComponent from "./Components/SetCalculationComponent/setCalculationComponent";
import {useAppDispatch, useAppSelector} from "./Store/hooks";
const { ipcRenderer } = window.require('electron');


const fs = window.require('fs')
const pathModule = window.require('path')

// const { app } = window.require('@electron/remote')

function App() {
    const [path, setPath] = useState(__dirname)
    const { appStatus } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()


  return (
      <LayoutComponent>
      {/*<div>*/}
      {/*    <HashRouter>*/}
      {/*        <Routes>*/}
      {/*            <Route path="/" Component={ HomePage } />*/}
      {/*            <Route path="/OrderCalculation" Component={ OrderCalculationPage } />*/}
      {/*        </Routes>*/}
      {/*    </HashRouter>*/}
      {/*</div>*/}
          <HomePage/>
          {
              appStatus.activeSheet && <SetCalculationComponent id={appStatus.activeSheet}/>
          }

      </LayoutComponent>

  );
}

export default App;
