import { ACTION_TYPES } from "./reducer";

export const addChildFolder = (childFolder) => ({
    type: ACTION_TYPES.ADD_CHILD_FOLDER,
    payload: childFolder,
});

export const addChildNote = (childNote) => ({
    type: ACTION_TYPES.ADD_CHILD_NOTE,
    payload: childNote,
});

export const deleteChildFolder = (uuid) => ({
    type: ACTION_TYPES.DELETE_CHILD_FOLDER,
    payload: uuid,
});

export const deleteChildNote = (uuid) => ({
    type: ACTION_TYPES.DELETE_CHILD_NOTE,
    payload: uuid,
});

export const setFolder = (folder) => ({
    type: ACTION_TYPES.SET_FOLDER,
    payload: folder,
});

export const setIsLoading = (isLoading) => ({
    type: ACTION_TYPES.SET_IS_LOADING,
    payload: isLoading,
});

export const updateChildFolder = (folder) => ({
    type: ACTION_TYPES.UPDATE_CHILD_FOLDER,
    payload: folder,
});

export const updateChildNote = (note) => ({
    type: ACTION_TYPES.UPDATE_CHILD_NOTE,
    payload: note,
});