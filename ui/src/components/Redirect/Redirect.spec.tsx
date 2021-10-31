import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import { mocked } from "ts-jest/utils";

import Redirect from "./Redirect";
import { useParams } from "react-router";
import {Router} from "react-router-dom";
import { createMemoryHistory } from "history";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useParams: jest.fn(),
}));

jest.mock("axios");

describe("Redirect", () => {

    const id = "id";
    const href = "href";

    const useParamsMock = mocked(useParams, true);
    const axiosMock = mocked(axios, true);

    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            href: href,
            assign: jest.fn() 
        }
    });
    const mockLocation = mocked(window.location, true);
    
    beforeEach(() => {
        useParamsMock.mockReturnValue({id});
    });

    it("should redirect when GET succeeds", async () => {
        const url = "url";
        axiosMock.get.mockResolvedValueOnce({data: url});

        render(<Redirect />);

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(`http://localhost:8081/${id}`);

        await waitFor(() => {
            expect(mockLocation.assign).toHaveBeenCalledTimes(1);
            expect(mockLocation.assign).toHaveBeenCalledWith(url);
        });
    });

    it("should show error when GET fails", async () => {
        axiosMock.get.mockRejectedValueOnce("ID not found");

        render(
            <Router history={createMemoryHistory()}>
                <Redirect />
            </Router>
        );

        expect(axiosMock.get).toHaveBeenCalledTimes(1);
        expect(axiosMock.get).toHaveBeenCalledWith(`http://localhost:8081/${id}`);

        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
            expect(screen.getByText(href)).toBeInTheDocument();

            const link = screen.getByText("Back To Home");
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "/");
        });

        expect(mockLocation.assign).not.toHaveBeenCalled();
    });

});