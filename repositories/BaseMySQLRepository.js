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

    async findOne(id) {
        const results = await this.query(
            `
                SELECT * FROM ${this.tableName} 
                WHERE id = ?
            `,
            [ id ],
        );
        return results.length ? results[0] : null;
    }
}