import { FoldersRepository } from "../repositories/FoldersRepository";

export class FoldersService {
    constructor() {
        this.foldersRepository = new FoldersRepository();
    }

    async getFolderAndChildFolders(uuid) {
        const folder = await this.foldersRepository.findOne(uuid);
        const childFolders = await this.foldersRepository.findByParentFolderUUID(uuid);
        
        return {
            folder,
            childFolders,
        };
    }
}