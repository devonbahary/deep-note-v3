import { DateTime } from 'luxon';

export class FormatUtil {
    static getName(item) {
        return item.name || 'untitled';
    }

    static getRelativeTimeFromMySQLTime(mysqlTime) {
        return DateTime.fromISO(mysqlTime.replace(/\.000Z$/g, '')).toRelative();
    }
}