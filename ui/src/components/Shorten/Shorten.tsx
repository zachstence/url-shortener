import React, { useState } from 'react';
import axios from "axios";

import "./Shorten.scss";

/**
 * Renders an input and button to enter a URL to shorten. POSTs an entered URL to the server
 * and shows the shortened URL. Shows an error if the POST fails.
 */
const Shorten: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [short, setShort] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setIsError(false);
        setShort("");

        try {
            const response = await axios.post("http://localhost:8081/add", url, {
                headers: {
                    "Content-Type": "text/plain"
                }
            });
            setShort(`${window.location.href}${response.data}`);
        } catch {
            setIsError(true);
        }
    }

    const renderShortOrError = (): JSX.Element | null => {
        if (isError) {
            return <p className="error">Error: Malformed URL. Please try again.</p>;
        } else if (short) {
            return (
                <p className="short">
                    Your shortened URL: <a href={short} className="short">{short}</a>
                </p>
            );
        } else {
            return null;
        }
    };

    return (
        <div className="shorten">
            <p className="instructions">Enter a URL you would like to shorten, then click SHORTEN!</p>
            <form onSubmit={onSubmit}>
                <div className="input-group">
                    <label htmlFor="url">URL</label>
                    <input
                        id="url"
                        className="gradient-border"
                        type="text"
                        value={url}
                        placeholder="https://www.website.com/with/a/long/url"
                        onChange={e => setUrl(e.target.value)}
                    />
                </div>
                <button type="submit">SHORTEN</button>
            </form>
            {renderShortOrError()}
        </div>
    );
}

export default Shorten;
    