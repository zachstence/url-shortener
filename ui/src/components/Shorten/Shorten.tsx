import React, { useEffect, useRef, useState } from 'react';
import * as api from '../../api/api';

import "./Shorten.scss";

/**
 * Renders an input and button to enter a URL to shorten. POSTs an entered URL to the server
 * and shows the shortened URL. Shows an error if the POST fails.
 */
const Shorten: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [short, setShort] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (input.current) input.current.focus();
    });
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setIsError(false);
        setShort("");

        try {
            const id = await api.add(url);
            setShort(`${window.location.href}${id}`);
        } catch {
            setIsError(true);
        }

        if (input.current) input.current.focus();
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
                        ref={input}
                    />
                </div>
                <button type="submit">SHORTEN</button>
            </form>
            {renderShortOrError()}
        </div>
    );
}

export default Shorten;
    