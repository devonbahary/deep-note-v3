import { BaseMySQLRepository } from "./BaseMySQLRepository";

export class NotesRepository extends BaseMySQLRepository {
    constructor() {
        super('notes');
    }

    async create(parentFolderUUID) {
        return super.create(
            `
                INSERT INTO ${this.tableName} (uuid_bin, parent_folder_uuid_bin, text)
                VALUES (${this.UUID_TO_BIN}, ${this.UUID_TO_BIN}, ?)
            `,
            [ parentFolderUUID, '' ],
        );
    }
    
    async findOne(uuid) {
        const results = await this.query(
            `
                SELECT uuid, parent_folder_uuid, name, text, updated_at FROM ${this.tableName} 
                ${this.WHERE_UUID_EQUALS}
            `,
            [ uuid ],
        );
        return results.length ? results[0] : null;
    }

    findByParentFolderUUID(parentFolderUUID) {
        return this.query(
            `
                SELECT uuid, parent_folder_uuid, name, text, updated_at 
                FROM ${this.tableName}
                WHERE parent_folder_uuid_bin = ${this.UUID_TO_BIN}
            `,
            [ parentFolderUUID ],
        );
    }

    async update(uuid, name, text) {
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

        sql += ` ${this.WHERE_UUID_EQUALS}`;
        values.push(uuid);

        return super.update(uuid, sql, values);
    }
}