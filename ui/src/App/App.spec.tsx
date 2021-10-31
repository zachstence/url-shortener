import React from "react";
import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {mocked} from "ts-jest/utils";
import {Router} from "react-router-dom";

import App from "./App";
import Shorten from "../components/Shorten/Shorten";
import Redirect from "../components/Redirect/Redirect";
import { createMemoryHistory, MemoryHistory } from "history";

jest.mock("../components/Shorten/Shorten");
jest.mock("../components/Redirect/Redirect");

describe("App", () => {
    let history: MemoryHistory;

    const ShortenMock = mocked(Shorten, true);
    const RedirectMock = mocked(Redirect, true);

    beforeEach(() => {
        ShortenMock.mockReturnValue(<div>Shorten</div>);
        RedirectMock.mockReturnValue(<div>Redirect</div>);

        history = createMemoryHistory();
    });


    it("should render Shorten at root path", () => {
        history.push("/");
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        
        expect(ShortenMock).toHaveBeenCalledTimes(1);
        expect(RedirectMock).not.toHaveBeenCalled();
    });

    it("should render Redirect at /:id", () => {
        history.push("/abc123");
        render(
            <Router history={history}>
                <App />
            </Router>
        );
        
        expect(RedirectMock).toHaveBeenCalledTimes(1);
        expect(ShortenMock).not.toHaveBeenCalled();
    });

    it("should render clickable GitHub icon", () => {
        render(
            <Router history={history}>
                <App />
            </Router>
        );

        const githubIcon = screen.getByAltText("GitHub Icon");
        expect(githubIcon).toBeInTheDocument();
        expect(githubIcon.parentElement?.getAttribute("href")).toEqual("https://github.com/zachstence/url-shortener");
    });
});