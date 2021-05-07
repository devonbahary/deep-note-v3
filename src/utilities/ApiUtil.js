import axios from 'axios';

export class ApiUtil {
    static async getFolder(uuid) {
        const { data } = await axios.get(`/api/folders/${uuid}`);
        return data;
    }

    static async createFolder(parentFolderUUID) {
        const { data } = await axios.post(`/api/folders`, { parentFolderUUID });
        return data;
    }

    static async updateFolder(uuid, name) {
        const { data } = await axios.put(`/api/folders/${uuid}`, { name });
        return data;
    }

    static async deleteFolder(uuid) {
        await axios.delete(`/api/folders/${uuid}`);
    }
    
    static async getNote(uuid) {
        const { data } = await axios.get(`/api/notes/${uuid}`);
        return data;
    }

    static async createNote(parentFolderUUID) {
        const { data } = await axios.post(`/api/notes`, { parentFolderUUID });
        return data;
    }

    static async updateNoteName(uuid, name) {
        const { data } = await axios.put(`/api/notes/name/${uuid}`, { name });
        return data;
    }

    static async updateNoteText(uuid, text) {
        await axios.put(`/api/notes/text/${uuid}`, { text });
    }

    static async deleteNote(uuid) {
        await axios.delete(`/api/notes/${uuid}`);
    }
}