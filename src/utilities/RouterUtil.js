export class RouterUtil {
    static goToFolder(history, uuid) {
        history.push(`/folders/${uuid}`);
    }

    static goToNote(history, id) {
        history.push(`/notes/${id}`);
    }
}
