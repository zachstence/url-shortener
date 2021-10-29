import { JsonDB } from "node-json-db";
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

interface UrlPair {
    short: string;
    long: string;
}

class Database {
    db = new JsonDB(new Config("db.json", true, true, '/'));

    add(short: string, long: string): UrlPair {
        this.db.push("/" + short, long);
        return this.db.getData(short);
    }

    get(short: string): UrlPair {
        return this.db.getData("/" + short);
    }

    delete(short: string): UrlPair {
        const toDelete = this.db.getData("/" + short);
        if (toDelete) {
            this.db.delete("/" + short);
            return toDelete;
        } else {
            throw new Error();
        }
    }
}

export default Database;