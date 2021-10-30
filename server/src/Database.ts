import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { getId } from "./id";

interface Url {
    id: string;
    url: string;
}

const SEP = "/";

class Database {
    db = new JsonDB(new Config("db.json", true, true, SEP));

    add(url: string): Url {
        // Generate ID that doesn't already exist in DB
        let id = getId();
        while (this.db.exists(SEP + id)) id = getId();

        this.db.push(SEP + id, url);

        const added = this.db.getObject<string>(SEP + id);
        return {
            id: id,
            url: added
        };
    }

    get(id: string): Url {
        return {
            id: id,
            url: this.db.getObject<string>(SEP + id)
        };
    }

    delete(id: string): Url {
        const toDelete = this.db.getObject<string>(SEP + id);
        this.db.delete(SEP + id);
        return {
            id: id,
            url: toDelete
        };
    }
}

export default Database;