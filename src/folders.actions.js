import { FOLDER_ACTION_TYPES } from "./folders.reducer";

export const addChildFolder = (childFolder) => ({
    type: FOLDER_ACTION_TYPES.ADD_CHILD_FOLDER,
    payload: childFolder,
});

export const addChildNote = (childNote) => ({
    type: FOLDER_ACTION_TYPES.ADD_CHILD_NOTE,
    payload: childNote,
});

export const deleteChildFolder = (uuid) => ({
    type: FOLDER_ACTION_TYPES.DELETE_CHILD_FOLDER,
    payload: uuid,
});

export const deleteChildNote = (uuid) => ({
    type: FOLDER_ACTION_TYPES.DELETE_CHILD_NOTE,
    payload: uuid,
});

export const setFolder = (folder) => ({
    type: FOLDER_ACTION_TYPES.SET_FOLDER,
    payload: folder,
});

export const setIsLoading = (isLoading) => ({
    type: FOLDER_ACTION_TYPES.SET_IS_LOADING,
    payload: isLoading,
});

export const updateChildFolder = (folder) => ({
    type: FOLDER_ACTION_TYPES.UPDATE_CHILD_FOLDER,
    payload: folder,
});

export const updateChildNote = (note) => ({
    type: FOLDER_ACTION_TYPES.UPDATE_CHILD_NOTE,
    payload: note,
});