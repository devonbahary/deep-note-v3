export class RouterUtil {
    static goToFolder(history, uuid) {
        history.push(`/folders/${uuid}`);
    }

    static goToNote(history, uuid) {
        history.push(`/notes/${uuid}`);
    }
}
