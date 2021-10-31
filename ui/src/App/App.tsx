import React from "react";
import {Switch, Route} from "react-router-dom";  
import Shorten from "../components/Shorten/Shorten";
import Redirect from "../components/Redirect/Redirect";

import "./App.scss";

/**
 * The root component of the app. Renders either Shorten or Redirect based on the current path.
 */
const App: React.FC = () => {
    return (
        <div className="app">
            <main>
                <Switch>
                    <Route exact path="/" component={Shorten} />
                    <Route exact path="/:id" component={Redirect} />
                </Switch>
            </main>
            <footer>
                <a href="https://github.com/zachstence/url-shortener">
                    <img src="github.png" alt="GitHub Icon"/>
                </a>
            </footer>
        </div>
    )
};

export default App;