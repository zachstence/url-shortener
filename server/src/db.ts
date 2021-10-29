import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { getId } from "./shorten";

interface Url {
    id: string;
    url: string;
}

class Database {
    db = new JsonDB(new Config("db.json", true, true, '/'));

    add(long: string): Url {
        // Generate ID that doesn't already exist in DB
        let id = getId();
        while (this.db.exists("/" + id)) id = getId();

        this.db.push("/" + id, long);

        const added = this.db.getObject<string>("/" + id);
        return {
            id: id,
            url: added
        };
    }

    get(id: string): Url {
        return {
            id: id,
            url: this.db.getObject<string>("/" + id)
        };
    }

    delete(id: string): Url {
        const toDelete = this.db.getObject<string>("/" + id);
        if (toDelete) {
            this.db.delete("/" + id);
            return {
                id: id,
                url: toDelete
            };
        } else {
            throw new Error();
        }
    }
}

export default Database;