import { DateTime } from 'luxon';

export class FormatUtil {
    static getRelativeTimeFromMySQLTime(mysqlTime) {
        return DateTime.fromISO(mysqlTime.replace(/\.000Z$/g, '')).toRelative();
    }
}