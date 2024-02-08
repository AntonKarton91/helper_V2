import React, {useState} from "react";
import {HashRouter, Route} from "react-router-dom";

function App() {
    const [path, setPath] = useState(__dirname)



    return (
        <HashRouter>
            <div>
                <Route path="/" component={ Home } />
    </div>
    </HashRouter>

);
}