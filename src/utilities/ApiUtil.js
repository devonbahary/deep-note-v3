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
}