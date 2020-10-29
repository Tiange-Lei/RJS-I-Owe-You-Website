import {createSelector} from 'reselect';
// ----------------------------------------------------------------------------------------------------------------------

export const getFavours = state=>state.favours.data;
export const getFavoursLoading = state=>state.favours.isLoading;
export const getAwards = state=>state.awards.data;
export const getAwardsLoading = state=>state.awards.isLoading;


export const getValidFavours = createSelector(
    getFavours,
    (favours)=>favours.filter(favour=>!favour.isAccepted),
)

export const getInvalidFavours = createSelector(
    getFavours,
    (favours)=>favours.filter(favour=>favour.isAccepted),
)
export const getRelatedAwards = createSelector(
    getAwards,
    (awards)=>awards.filter(award=>award.debtor===localStorage.username||award.creditor===localStorage.username),
)

export const getIOUAwards = createSelector(
    getRelatedAwards,
    (awards)=>awards.filter(award=>award.debtor===localStorage.username)
)
export const getUOIAwards = createSelector(
    getRelatedAwards,
    (awards)=>awards.filter(award=>award.creditor===localStorage.username)
)

export const getSearchedFavours = createSelector(
    getFavours,
    (favours)=>favours.filter(favour=>favour.text.match(localStorage.keyword))
)