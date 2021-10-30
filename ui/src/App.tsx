import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";  
import Redirect from "./components/Redirect/Redirect";
import Shorten from "./components/Shorten/Shorten";

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