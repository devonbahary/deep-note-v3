import { DateTime } from 'luxon';

export class FormatUtil {
    static getFolderName(folder) {
        if (!folder.parent_folder_uuid) return 'root';
        return FormatUtil.getName(folder);
    }

    static getName(item) {
        return item.name || 'untitled';
    }

    static getRelativeTimeFromMySQLTime(mysqlTime) {
        return DateTime.fromISO(mysqlTime.replace(/\.000Z$/g, '')).toRelative();
    }
}