import { v1 as uuidV1 } from 'uuid';
import { BaseMySQLRepository } from "./BaseMySQLRepository";

const UUID_TO_BIN = `UNHEX(REPLACE(?, '-', ''))`;
const WHERE_UUID_EQUALS = `WHERE uuid_bin = ${UUID_TO_BIN}`;

export class FoldersRepository extends BaseMySQLRepository {
    constructor() {
        super('folders');
    }

    async create(name, parentFolderUUID) {
        const uuid = uuidV1();

        await this.query(
            `
                INSERT INTO ${this.tableName} (uuid_bin, name, parent_folder_uuid_bin)
                VALUES (${UUID_TO_BIN}, ?, ${UUID_TO_BIN})
            `,
            [ uuid, name, parentFolderUUID ],
        );

        const newRecord = await this.findOne(uuid);

        return newRecord;
    }

    async findOne(uuid) {
        const results = await this.query(
            `
                SELECT uuid, name, parent_folder_uuid, updated_at FROM ${this.tableName} 
                ${WHERE_UUID_EQUALS}
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
                ) as child_folder_count
                FROM ${this.tableName} AS f
                WHERE parent_folder_uuid_bin = ${UUID_TO_BIN}
            `,
            [ parentFolderUUID ],
        );
    }

    async update(uuid, name) {
        await this.query(
            `
                UPDATE ${this.tableName} 
                SET name = ?
                ${WHERE_UUID_EQUALS}
            `,
            [ name, uuid ],
        );

        const updatedRecord = await this.findOne(uuid);

        return updatedRecord;
    }

    delete(uuid) {
        return this.query(
            `
                DELETE FROM ${this.tableName}
                ${WHERE_UUID_EQUALS}
            `,
            [ uuid ],
        );
    }
}