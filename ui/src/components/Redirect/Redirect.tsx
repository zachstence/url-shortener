import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import "./Redirect.scss";

const Redirect: React.FC = () => {
    const [isError, setIsError] = useState<boolean>(false);

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8081/${id}`);
                window.location.assign("//" + response.data);
            } catch {
                setIsError(true);
            }
        })();
    }, []);

    if (isError) {
        return (
            <div className="redirect">
                <div className="error">
                    <h1>Error</h1>
                    <p>The short URL <pre>{window.location.href}</pre> does not exist.</p>
                    <Link className="back-to-home" to="/">Back To Home</Link>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Redirect;