import React, {useMemo, useState} from 'react';
import HomePage from "./Pages/HomePage";
import LayoutComponent from "./Components/Layout/LayoutComponent";
import SetCalculationComponent from "./Components/SetCalculationComponent/setCalculationComponent";
import {useAppDispatch, useAppSelector} from "./Store/hooks";

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
          {
              appStatus.activeSheet && <SetCalculationComponent id={appStatus.activeSheet}/>
          }

      </LayoutComponent>

  );
}

export default App;
