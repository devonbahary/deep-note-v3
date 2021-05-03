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
    
    static async createNote(parentFolderUUID) {
        const { data } = await axios.post(`/api/notes`, { parentFolderUUID });
        return data;
    }

    static async updateNote(id, name) {
        const { data } = await axios.put(`/api/notes/${id}`, { name });
        return data;
    }

    static async deleteNote(id) {
        await axios.delete(`/api/notes/${id}`);
    }
}