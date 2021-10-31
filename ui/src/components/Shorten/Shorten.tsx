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
            <div className="input-group">
                <label htmlFor="url">URL</label>
                <input id="url" className="gradient-border" type="text" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <button type="button" onClick={onClick}>SHORTEN</button>
            <a href={short} className="short">{short}</a>
        </div>
    );
}

export default Shorten;
    