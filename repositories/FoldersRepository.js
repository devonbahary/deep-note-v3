import { BaseMySQLRepository } from "./BaseMySQLRepository";

export class FoldersRepository extends BaseMySQLRepository {
    constructor() {
        super('folders');
    }

    async create(parentFolderUUID) {
        const uuid = this.generateUUID();

        await this.query(
            `
                INSERT INTO ${this.tableName} (uuid_bin, parent_folder_uuid_bin)
                VALUES (${this.UUID_TO_BIN}, ${this.UUID_TO_BIN})
            `,
            [ uuid, parentFolderUUID ],
        );

        const newRecord = await this.findOne(uuid);

        return newRecord;
    }

    async findOne(uuid) {
        const results = await this.query(
            `
                SELECT uuid, name, parent_folder_uuid, updated_at FROM ${this.tableName} 
                ${this.WHERE_UUID_EQUALS}
            `,
            [ uuid ],
        );
        return results.length ? results[0] : null;
    }

    findByParentFolderUUID(parentFolderUUID) {
        return this.query(
            `
                SELECT uuid, name, parent_folder_uuid, updated_at, 
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
                WHERE parent_folder_uuid_bin = ${this.UUID_TO_BIN}
            `,
            [ parentFolderUUID ],
        );
    }

    async update(uuid, name) {
        await this.query(
            `
                UPDATE ${this.tableName} 
                SET name = ?
                ${this.WHERE_UUID_EQUALS}
            `,
            [ name, uuid ],
        );

        const updatedRecord = await this.findOne(uuid);

        return updatedRecord;
    }
}