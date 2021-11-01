import {render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import { mocked } from "ts-jest/utils";

import Redirect from "./Redirect";
import { useParams } from "react-router";
import {Router} from "react-router-dom";
import { createMemoryHistory } from "history";
import {get} from "../../api";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useParams: jest.fn(),
}));

jest.mock("../../api");

describe("Redirect", () => {

    const id = "id";
    const href = "href";

    const useParamsMock = mocked(useParams, true);
    const getMock = mocked(get, true);

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
        getMock.mockResolvedValueOnce(url);

        render(<Redirect />);

        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith(id);

        await waitFor(() => {
            expect(mockLocation.assign).toHaveBeenCalledTimes(1);
            expect(mockLocation.assign).toHaveBeenCalledWith(url);
        });
    });

    it("should show error when GET fails", async () => {
        getMock.mockRejectedValueOnce("ID not found");

        render(
            <Router history={createMemoryHistory()}>
                <Redirect />
            </Router>
        );

        expect(getMock).toHaveBeenCalledTimes(1);
        expect(getMock).toHaveBeenCalledWith(id);
        
        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
            expect(screen.getByText(href)).toBeInTheDocument();
            
            const link = screen.getByText("Back To Home");
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", "/");
        });
    });

});