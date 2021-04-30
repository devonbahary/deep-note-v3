import axios from 'axios';

export class ApiUtil {
    static async getFolder(uuid) {
        const { data } = await axios.get(`/api/folders/${uuid}`);
        return data;
    }

    static async createFolder(name, parentFolderUUID) {
        const { data } = await axios.post(`/api/folders`, { name, parentFolderUUID });
        return data;
    }

    static async updateFolder(uuid, name) {
        const { data } = await axios.put(`/api/folders/${uuid}`, { name });
        return data;
    }

    static async deleteFolder(uuid) {
        await axios.delete(`/api/folders/${uuid}`);
    }
}