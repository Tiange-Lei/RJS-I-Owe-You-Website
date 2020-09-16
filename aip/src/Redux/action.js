export const CREATE_FAVOUR = 'CREATE_FAVOUR';
export const createFavour = favour =>({
    type:CREATE_FAVOUR,
    payload:{favour},
})

export const REMOVE_FAVOUR = 'REMOVE_FAVOUR';
export const removeFavour = favour =>({
    type:REMOVE_FAVOUR,
    payload:{favour}
})

export const ACCEPT_FAVOUR = 'ACCEPT_FAVOUR';
export const acceptFavour = favour =>({
    type: ACCEPT_FAVOUR,
    payload:{favour}
})

export const LOAD_FAVOURS_IN_PROGRESS = 'LOAD_FAVOURS_IN_PROGRESS';
export const loadFavoursInProgress = ()=>({
    type:LOAD_FAVOURS_IN_PROGRESS,
})

export const LOAD_FAVOURS_SUCCESS = 'LOAD_FAVOURS_SUCCESS';
export const loadFavoursSuccess = favours=>({
    type:LOAD_FAVOURS_SUCCESS,
    payload: {favours},
})

export const LOAD_FAVOURS_FAILURE = 'LOAD_FAVOURS_FAILURE';
export const loadFavoursFailure = ()=>({
    type:LOAD_FAVOURS_FAILURE
})