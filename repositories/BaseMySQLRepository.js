import { v1 as uuidV1 } from 'uuid';
import { connection } from "../database/mysql-connect";

export class BaseMySQLRepository {
    constructor(tableName) {
        this.tableName = tableName;
        this.connection = connection;
        this.UUID_TO_BIN = `UNHEX(REPLACE(?, '-', ''))`;
        this.WHERE_UUID_EQUALS = `WHERE uuid_bin = ${this.UUID_TO_BIN}`;
    }

    generateUUID() {
        return uuidV1();
    }

    query(sql, values) {
        return new Promise((res, rej) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) return rej(err);
                res(results);
            });
        });
    }

    delete(uuid) {
        return this.query(
            `
                DELETE FROM ${this.tableName}
                ${this.WHERE_UUID_EQUALS}
            `,
            [ uuid ],
        );
    }
}