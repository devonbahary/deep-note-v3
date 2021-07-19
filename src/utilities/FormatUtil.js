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

    static getFolderSecondaryText(folder) {
        const { updated_at, child_folder_count, child_note_count } = folder;
        
        let secondaryText = ``;
        
        if (child_folder_count) {
            secondaryText += `${child_folder_count} folder`
            if (child_folder_count > 1) secondaryText += `s`;
            secondaryText += ` | `;
        }
        
        if (child_note_count) {
            secondaryText += `${child_note_count} note`
            if (child_note_count > 1) secondaryText += `s`;
            secondaryText += ` | `;
        }
    
        secondaryText += FormatUtil.getRelativeTimeFromMySQLTime(updated_at);
        
        return secondaryText;
    };

    static getNoteSecondaryText(note) {
        return FormatUtil.getRelativeTimeFromMySQLTime(note.updated_at);
    }
}