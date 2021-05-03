import { BaseMySQLRepository } from "./BaseMySQLRepository";

export class NotesRepository extends BaseMySQLRepository {
    constructor() {
        super('notes');
    }

    async create(parentFolderUUID, name = '', text = '') {
        const { insertId } = await this.query(
            `
                INSERT INTO ${this.tableName} (name, parent_folder_uuid_bin, text)
                VALUES (?, ${this.UUID_TO_BIN}, ?)
            `,
            [ name, parentFolderUUID, text ],
        );

        const newRecord = await this.findOne(insertId);

        return newRecord;
    }
    
    async findOne(id) {
        const results = await this.query(
            `
                SELECT id, name, parent_folder_uuid, text, updated_at FROM ${this.tableName} 
                WHERE id = ?
            `,
            [ id ],
        );
        return results.length ? results[0] : null;
    }

    findByParentFolderUUID(parentFolderUUID) {
        return this.query(
            `
                SELECT id, name, parent_folder_uuid, text, updated_at 
                FROM ${this.tableName}
                WHERE parent_folder_uuid_bin = ${this.UUID_TO_BIN}
            `,
            [ parentFolderUUID ],
        );
    }

    async update(id, name, text) {
        let sql = `UPDATE ${this.tableName} SET`;
        const values = [];
        
        if (name) {
            sql += ` name = ?`;
            if (text) sql += `,`;
            values.push(name);
        } 
        
        if (text) {
            sql += ` text = ?`;
            values.push(text);
        }

        sql += ` WHERE id = ?`;
        values.push(id);

        await this.query(sql, values);

        const updatedRecord = await this.findOne(id);

        return updatedRecord;
    }

    delete(id) {
        return this.query(
            `
                DELETE FROM ${this.tableName}
                WHERE id = ?
            `,
            [ id ],
        );
    }
}