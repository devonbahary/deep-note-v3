import { v1 as uuidV1 } from 'uuid';
import { BaseMySQLRepository } from "./BaseMySQLRepository";

const UUID_TO_BIN = `UNHEX(REPLACE(?, '-', ''))`;
const WHERE_UUID_EQUALS = `WHERE uuid_bin = ${UUID_TO_BIN}`;

export class FoldersRepository extends BaseMySQLRepository {
    constructor() {
        super('folders');
    }

    async create(name, parentFolderUuid) {
        const uuid = uuidV1();

        await this.query(
            `
                INSERT INTO ${this.tableName} (uuid_bin, name, parent_folder_uuid_bin)
                VALUES (${UUID_TO_BIN}, ?, ${UUID_TO_BIN})
            `,
            [ uuid, name, parentFolderUuid ],
        );

        const newRecord = await this.findOne(uuid);

        return newRecord;
    }

    async findOne(uuid) {
        const results = await this.query(
            `
                SELECT uuid, name, parent_folder_uuid FROM ${this.tableName} 
                ${WHERE_UUID_EQUALS}
            `,
            [ uuid ],
        );
        return results.length ? results[0] : null;
    }

    async update(uuid, name, parentFolderUuid) {
        await this.query(
            `
                UPDATE ${this.tableName} 
                SET name = ?, parent_folder_uuid_bin = ${UUID_TO_BIN}
                ${WHERE_UUID_EQUALS}
            `,
            [ name, parentFolderUuid, uuid ],
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