import React, { useState } from 'react';
import axios from "axios";

import "./Shorten.scss";

const Shorten: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    const [short, setShort] = useState<string>("");
    
    const onClick = () => {
        (async () => {
            const response = await axios.post("http://localhost:8081/add", url, {
                headers: {
                    "Content-Type": "text/plain"
                }
            });
            setShort(`${window.location.href}${response.data}`);
        })();
    }

    return (
        <div className="shorten">
            <p className="instructions">Enter a link you would like to shorten, then click SHORTEN!</p>
            <form>
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
                <button type="button" onClick={onClick}>SHORTEN</button>
            </form>
            {short && (
                <p className="short">
                    Your shortened URL: <a href={short} className="short">{short}</a>
                </p>
            )}
        </div>
    );
}

export default Shorten;
    