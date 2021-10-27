// export const shorten = (url: string): string => {

// };

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const ID_LENGTH = 6;

export const getId = (): string => {
    let out = "";
    for (let i = 0; i < ID_LENGTH; i++) {
        const r = Math.floor(Math.random() * CHARACTERS.length);
        out += CHARACTERS.charAt(r);
    }
    return out;
}