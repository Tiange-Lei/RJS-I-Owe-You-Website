import {createSelector} from 'reselect';


export const getFavours = state=>state.favours.data;
export const getFavoursLoading = state=>state.favours.isLoading;


export const getValidFavours = createSelector(
    getFavours,
    (favours)=>favours.filter(favour=>!favour.isAccepted),
)

export const getInvalidFavours = createSelector(
    getFavours,
    (favours)=>favours.filter(favour=>favour.isAccepted),
)
