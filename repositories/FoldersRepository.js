import { BaseMySQLRepository } from "./BaseMySQLRepository";

export class FoldersRepository extends BaseMySQLRepository {
    constructor() {
        super('folders');
    }

    getSelectQuery() {
        return `
            SELECT uuid, name, parent_folder_uuid, color, updated_at, 
            (
                SELECT COUNT(*)
                FROM ${this.tableName}
                WHERE parent_folder_uuid_bin = f.uuid_bin
            ) as child_folder_count,
            (
                SELECT COUNT(*)
                FROM notes
                WHERE parent_folder_uuid_bin = f.uuid_bin
            ) as child_note_count                
            FROM ${this.tableName} AS f
        `;
    }

    create(parentFolderUUID, name) {
        return super.create(
            `
                INSERT INTO ${this.tableName} (uuid_bin, parent_folder_uuid_bin, name)
                VALUES (${this.UUID_TO_BIN}, ${this.UUID_TO_BIN}, ?)
            `,
            [ parentFolderUUID, name ],
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
}