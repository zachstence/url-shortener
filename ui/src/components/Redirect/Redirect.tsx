import React, { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Link } from "react-router-dom";
import * as api from "../../api";

import "./Redirect.scss";

/**
 * GETs the server for a URL matching the given /:id and redirects to it. Shows an error if
 * the GET fails.
 */
const Redirect: React.FC = () => {
    const [isError, setIsError] = useState<boolean>(false);

    const {id} = useParams<{id: string}>();

    const redirect = async (): Promise<void> => {
        try {
            const url = await api.get(id);
            window.location.assign(url);
        } catch (e) {
            setIsError(true);
        }
    }

    useEffect(() => {
        redirect();
    });

    if (isError) {
        return (
            <div className="redirect">
                <div className="error">
                    <h1>Error</h1>
                    <div className="message">The short URL <pre>{window.location.href}</pre> does not exist.</div>
                    <Link className="back-to-home" to="/">Back To Home</Link>
                </div>
            </div>
        );
    } else {
        return null;
    }
};

export default Redirect;