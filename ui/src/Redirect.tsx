import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const Redirect: React.FC = () => {
    const [isError, setIsError] = useState<boolean>(false);

    const {id} = useParams<{id: string}>();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:8081/${id}`);
                window.location.href = response.data;
            } catch {
                setIsError(true);
            }
        })();
    }, []);

    if (isError) {
        return <div>Error</div>;
    } else {
        return <div>Loading...</div>;
    }
};

export default Redirect;