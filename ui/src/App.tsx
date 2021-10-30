import React, { useState } from 'react';
import axios from "axios";

function App(): JSX.Element {
    const [url, setUrl] = useState<string>("");
    
    const onClick = () => {
        console.log(url);

        axios.post("http://localhost:8081/add", url, {
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

    return (
        <div className="app">
            <input type="text" value={url} onChange={e => setUrl(e.target.value)} />
            <button type="button" onClick={onClick}>Shorten!</button>
        </div>
    );
}

export default App;
    