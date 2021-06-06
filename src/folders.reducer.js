export const FOLDER_ACTION_TYPES = {
    ADD_CHILD_FOLDER: 'ADD_CHILD_FOLDER',
    ADD_CHILD_NOTE: 'ADD_CHILD_NOTE',
    DELETE_CHILD_FOLDER: 'DELETE_CHILD_FOLDER',
    DELETE_CHILD_NOTE: 'DELETE_CHILD_NOTE',
    SET_FOLDER: 'SET_FOLDER',
    SET_IS_LOADING: 'SET_IS_LOADING',
    UPDATE_CHILD_FOLDER: 'UPDATE_CHILD_FOLDER',
    UPDATE_CHILD_NOTE: 'UPDATE_CHILD_NOTE',
};

export const initialState = {
    childFolders: [],
    childNotes: [],
    folder: null,
    isLoading: false,
};

export const foldersReducer = (state, action) => {
    switch (action.type) {
        case FOLDER_ACTION_TYPES.ADD_CHILD_FOLDER:
            const { payload: childFolder } = action;
            return {
                ...state,
                childFolders: [
                    ...state.childFolders,
                    childFolder,
                ],
            };
        case FOLDER_ACTION_TYPES.ADD_CHILD_NOTE:
            const { payload: childNote } = action;
            return {
                ...state,
                childNotes: [
                    ...state.childNotes,
                    childNote,
                ],
            };
        case FOLDER_ACTION_TYPES.DELETE_CHILD_FOLDER:
            const { payload: folderUUID } = action;
            return {
                ...state,
                childFolders: state.childFolders.filter(childFolder => childFolder.uuid !== folderUUID),
            };
        case FOLDER_ACTION_TYPES.DELETE_CHILD_NOTE:
            const { payload: noteUUID } = action;
            return {
                ...state,
                childNotes: state.childNotes.filter(childNote => childNote.uuid !== noteUUID),
            };
        case FOLDER_ACTION_TYPES.SET_FOLDER:
            const { folder, childFolders, childNotes } = action.payload;
            return {
                ...state,
                folder,
                childFolders,
                childNotes,
            };
        case FOLDER_ACTION_TYPES.SET_IS_LOADING:
            const { payload: isLoading } = action;
            return {
                ...state,
                isLoading,
            };
        case FOLDER_ACTION_TYPES.UPDATE_CHILD_FOLDER:
            const { payload: updateFolder } = action;
            return {
                ...state,
                childFolders: state.childFolders.map(childFolder => childFolder.uuid === updateFolder.uuid ? updateFolder : childFolder),
            };
        case FOLDER_ACTION_TYPES.UPDATE_CHILD_NOTE:
            const { payload: updateNote } = action;
            return {
                ...state,
                childNotes: state.childNotes.map(childNote => childNote.uuid === updateNote.uuid ? updateNote : childNote),
            };
        default:
            throw new Error(`can't recognize action with type ${action.type}`);
    }
}