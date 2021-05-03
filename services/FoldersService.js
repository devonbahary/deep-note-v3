import { FoldersRepository } from "../repositories/FoldersRepository";
import { NotesRepository } from "../repositories/NotesRepository";

export class FoldersService {
    constructor() {
        this.foldersRepository = new FoldersRepository();
        this.notesRepository = new NotesRepository();
    }

    async getFolderAndChildren(uuid) {
        const folder = await this.foldersRepository.findOne(uuid);
        const childFolders = await this.foldersRepository.findByParentFolderUUID(uuid);
        const childNotes = await this.notesRepository.findByParentFolderUUID(uuid);
        
        return {
            folder,
            childFolders,
            childNotes,
        };
    }
}