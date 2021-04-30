import { connection } from "../database/mysql-connect";

export class BaseMySQLRepository {
    constructor(tableName) {
        this.tableName = tableName;
        this.connection = connection;
    }

    query(sql, values) {
        return new Promise((res, rej) => {
            this.connection.query(sql, values, (err, results) => {
                if (err) return rej(err);
                res(results);
            });
        });
    }
}