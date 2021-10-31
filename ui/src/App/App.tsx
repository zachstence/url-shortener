import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";  
import Redirect from "../components/Redirect/Redirect";
import Shorten from "../components/Shorten/Shorten";

import "./App.scss";

const App: React.FC = () => {
    return (
        <div className="app">
            <header>
                <h1>URL SHORTENER</h1>
            </header>
            <main>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Shorten} />
                        <Route exact path="/:id" component={Redirect} />
                    </Switch>
                </BrowserRouter>
            </main>
            <footer>
                <a href="https://github.com/zachstence/war">
                    <img src="github.png" alt="GitHub Icon"/>
                </a>
            </footer>
        </div>
    )
};

export default App;