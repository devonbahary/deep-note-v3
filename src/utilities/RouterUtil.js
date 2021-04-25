export class RouterUtil {
    static goToFolder(history, folderUUID) {
        history.push(`/folders/${folderUUID}`);
    }
}
