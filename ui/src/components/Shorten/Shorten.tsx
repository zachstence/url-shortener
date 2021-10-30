import React, { useState } from 'react';
import axios from "axios";

const Shorten: React.FC = () => {
    const [url, setUrl] = useState<string>("");
    
    const onClick = () => {
        axios.post("http://localhost:8081/add", url, {
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

    return (
        <div className="shorten">
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
            <button type="button" onClick={onClick}>Shorten!</button>
        </div>
    );
}

export default Shorten;
    