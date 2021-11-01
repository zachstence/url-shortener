/** Viable characters to generate IDs from. */
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
/** The length of an ID. */
const ID_LENGTH = 6;

/**
 * Generates and returns an alphanumeric ID of length 6.
 * @returns An ID.
 */
export const getId = (): string => {
    let out = "";
    for (let i = 0; i < ID_LENGTH; i++) {
        const r = Math.floor(Math.random() * CHARACTERS.length);
        out += CHARACTERS.charAt(r);
    }
    return out;
}

/** A regular expression to check if a given string contains a valid http/https protocol. */
const URL_REGEXP = new RegExp(/(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?/)

/**
 * Parses a given string to a URL, appending an https protocol if necessary.
 * @param s The string to parse.
 * @returns The parsed URL.
 * @throws If the URL is malformed.
 */
export const parseUrl = (s: string): string => {
    if (s.match(URL_REGEXP)) {
        return s;
    } else {
        throw new Error("Malformed URL");
    }
};