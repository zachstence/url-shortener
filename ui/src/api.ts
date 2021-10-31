import axios from "axios";

const api = axios.create({
    baseURL: process.env.ENV === "dev" ? `http://localhost:8081` : `https://zach08-url-shortener.herokuapp.com`
});

export const add = async (url: string): Promise<string> => {
    const response = await api.post("/add", url, {
        headers: {
            "Content-Type": "text/plain"
        }
    });
    return response.data;
}

export const get = async (id: string): Promise<string> => {
    const response = await api.get(`/${id}`);
    return response.data;
};