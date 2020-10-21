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

export const END_FAVOUR = 'END_FAVOUR';
export const endFavour = (favour)=>({
    type:END_FAVOUR,
    payload:{favour},
})

export const SEARCH_FAVOUR = 'SEARCH_FAVOUR';
export const searchFavour = (favour)=>({
    type:SEARCH_FAVOUR,
    payload:{favour},
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


// ---------------------comments actions----------------------------
export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = comment =>({
    type:ADD_COMMENT,
    payload:{comment},
});

// ---------------------addaward action------------------------
export const ADD_AWARD = 'ADD_AWARD';
export const addAward = award =>({
    type:ADD_AWARD,
    payload:{award},
})

//-------------------load awards------------------------------
export const LOAD_AWARDS_IN_PROGRESS = 'LOAD_AWARDS_IN_PROGRESS';
export const loadAwardsInProgress = ()=>({
    type:LOAD_AWARDS_IN_PROGRESS,
})

export const LOAD_AWARDS_SUCCESS = 'LOAD_AWARDS_SUCCESS';
export const loadAwardsSuccess = awards=>({
    type:LOAD_AWARDS_SUCCESS,
    payload: {awards},
})

export const LOAD_AWARDS_FAILURE = 'LOAD_AWARDS_FAILURE';
export const loadAwardsFailure = ()=>({
    type:LOAD_AWARDS_FAILURE
})
// ----------------create award relation-------------------
export const CREATE_AWARD_RELATION = 'CREATE_AWARD_RELATION';
export const createAwardRelation = awardRelation=>({
    type:CREATE_AWARD_RELATION,
    payload:{awardRelation}
}
)
// ----------------remove award relation------------------
export const REMOVE_AWARD_RELATION = 'REMOVE_AWARD_RELATION';
export const removeAwardRelation = restAward=>({
    type:REMOVE_AWARD_RELATION,
    payload:{restAward}
}
)
//-------------load leader board--------
export const LOAD_LEADER_BOARD = 'LOAD_LEADER_BOARD';
export const loadLeaderBoard = users =>({
    type:LOAD_LEADER_BOARD,
    payload:{users}
})
//-------------party detection-------------
export const GET_PARTY = 'GET_PARTY';
export const getPartyDet = partyInfo =>({
    type:GET_PARTY,
    payload:{partyInfo}
})