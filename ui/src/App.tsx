import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";  
import Redirect from "./Redirect";
import Shorten from "./Shorten";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Shorten} />
                <Route exact path="/:id" component={Redirect} />
            </Switch>
        </BrowserRouter>
    )
};

export default App;