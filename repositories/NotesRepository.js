import { BaseMySQLRepository } from "./BaseMySQLRepository";

export class NotesRepository extends BaseMySQLRepository {
    constructor() {
        super('notes');
    }

    getSelectQuery() {
        return `
            SELECT uuid, parent_folder_uuid, name, text, color, updated_at FROM ${this.tableName} 
        `;
    }

    async create(parentFolderUUID, name) {
        return super.create(
            `
                INSERT INTO ${this.tableName} (uuid_bin, parent_folder_uuid_bin, text, name)
                VALUES (${this.UUID_TO_BIN}, ${this.UUID_TO_BIN}, ?, ?)
            `,
            [ parentFolderUUID, '', name ],
        );
    }
    
    async findOne(uuid) {
        const results = await this.query(
            `
                ${this.getSelectQuery()}
                ${this.WHERE_UUID_EQUALS}
            `,
            [ uuid ],
        );
        return results.length ? results[0] : null;
    }

    findByParentFolderUUID(parentFolderUUID) {
        return this.query(
            `
                ${this.getSelectQuery()}
                WHERE parent_folder_uuid_bin = ${this.UUID_TO_BIN}
            `,
            [ parentFolderUUID ],
        );
    }

    updateText(uuid, text) {
        return this.query(
            `
                UPDATE ${this.tableName}
                SET text = ?
                ${this.WHERE_UUID_EQUALS}
            `,
            [ text, uuid ],
        );
    }
}