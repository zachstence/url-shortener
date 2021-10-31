import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { getId, toUrl } from "./util";

export interface Entry {
    id: string;
    url: string;
}

const SEP = "/";

class Database {
    db: JsonDB;

    constructor(filename: string) {
        this.db = new JsonDB(new Config(filename, true, true, SEP));
    }

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

    get(id: string): Entry {
        return {
            id: id,
            url: this.db.getObject<string>(SEP + id)
        };
    }

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