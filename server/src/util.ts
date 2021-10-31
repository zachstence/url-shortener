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

const PROTOCOL_REGEXP = new RegExp(/^https?:\/\//);

export const toUrl = (s: string): URL => {
    if (s.match(PROTOCOL_REGEXP)) {
        return new URL(s);
    } else {
        return new URL(`https://${s}`);
    }
};