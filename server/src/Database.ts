import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { getId, toUrl } from "./util";

/** Associates an ID to a URL. */
export interface Entry {
    id: string;
    url: string;
}

/** An arbitrary separator used for interacting with the JsonDB. */
const SEP = "/";

/** Manages a database containing ID-URL associations to power a URL shortener. */
class Database {
    db: JsonDB;

    /**
     * Create a new Database managed in a JSON file.
     * @param filename The name of the JSON file to store ID-URL associations in.
     */
    constructor(filename: string) {
        this.db = new JsonDB(new Config(filename, true, true, SEP));
    }

    /**
     * Adds an Entry to the database with the given URL and a newly generated ID.
     * @param s The URL to add to the database.
     * @returns An Entry containing the ID and URL that was added to the database.
     * @throws If the URL is malformed.
     */
    add(s: string): Entry {
        // Generate ID that doesn't already exist in DB
        let id = getId();
        while (this.db.exists(SEP + id)) id = getId();

        const url = toUrl(s);
        this.db.push(SEP + id, url.href);

        const added = this.db.getObject<string>(SEP + id);
        return {
            id: id,
            url: added
        };
    }

    /**
     * Reads an Entry from the database given an ID.
     * @param id The ID of the Entry to read.
     * @returns An Entry containing the ID and URL that was read.
     * @throws If an Entry with the given ID does not exist in the database.
     */
    get(id: string): Entry {
        return {
            id: id,
            url: this.db.getObject<string>(SEP + id)
        };
    }

    /**
     * Deletes an Entry from the database given an ID.
     * @param id The ID of the Entry to delete.
     * @returns The deleted Entry.
     * @throws If an Entry with the given ID does not exist in the database.
     */
    delete(id: string): Entry {
        const toDelete = this.db.getObject<string>(SEP + id);
        this.db.delete(SEP + id);
        return {
            id: id,
            url: toDelete
        };
    }
}

export default Database;