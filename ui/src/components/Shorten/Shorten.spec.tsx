import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
import { mocked } from "ts-jest/utils";

import Shorten from "./Shorten";

jest.mock("axios");

describe("Shorten", () => {

    const axiosMock = mocked(axios, true);

    beforeEach(() => {
        render(<Shorten />);
    });

    it("should render instructions", () => {
        const instructions = screen.getByText("Enter a URL you would like to shorten, then click SHORTEN!");
        expect(instructions).toBeInTheDocument();
    });

    it("should render URL input", () => {
        const input = screen.getByLabelText("URL");
        expect(input).toBeInTheDocument();
    });

    it("should render SHORTEN button", () => {
        const button = screen.getByText("SHORTEN");
        expect(button).toBeInTheDocument();
    });

    it("should render shortened URL when POST succeeds", async () => {
        const url = "url";
        const id = "id"
        axiosMock.post.mockResolvedValueOnce({data: id});

        const urlInput = screen.getByLabelText("URL");
        userEvent.type(urlInput, url);

        const shortenButton = screen.getByText("SHORTEN");
        userEvent.click(shortenButton);

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith("http://localhost:8081/add", url, {
            headers: {
                "Content-Type": "text/plain"
            }
        });

        await waitFor(() => {
            const short = screen.queryByText(`http://localhost/${id}`);
            expect(short).toBeInTheDocument();
        });

        const error = screen.queryByText("Error: Malformed URL. Please try again.")
        expect(error).not.toBeInTheDocument();
    });

    it("should render error when POST fails", async () => {
        const url = "url";
        axiosMock.post.mockRejectedValueOnce("Malformed URL");

        const urlInput = screen.getByLabelText("URL");
        userEvent.type(urlInput, url);

        const shortenButton = screen.getByText("SHORTEN");
        userEvent.click(shortenButton);

        expect(axiosMock.post).toHaveBeenCalledTimes(1);
        expect(axiosMock.post).toHaveBeenCalledWith("http://localhost:8081/add", url, {
            headers: {
                "Content-Type": "text/plain"
            }
        });

        await waitFor(() => {
            const error = screen.getByText("Error: Malformed URL. Please try again.")
            expect(error).toBeInTheDocument();
        });
    });
});