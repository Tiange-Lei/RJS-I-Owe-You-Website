
import {CREATE_FAVOUR,
    REMOVE_FAVOUR, 
    ACCEPT_FAVOUR,
    LOAD_FAVOURS_IN_PROGRESS,
    LOAD_FAVOURS_SUCCESS,
    LOAD_FAVOURS_FAILURE,
    ADD_COMMENT,
    END_FAVOUR, 
    ADD_AWARD,
    LOAD_AWARDS_IN_PROGRESS,
    LOAD_AWARDS_FAILURE,
    LOAD_AWARDS_SUCCESS, 
    CREATE_AWARD_RELATION, 
    REMOVE_AWARD_RELATION,
    LOAD_LEADER_BOARD,
    GET_PARTY, 
    SEARCH_FAVOUR,
} from './action';

// ------create state for favours--------------------------------

const initialFavourState = {isLoading:false,data:[]};

export const favours = (state=initialFavourState,action)=>{
const {type,payload} = action;
switch(type){
// ---------create favour------------------------
    case CREATE_FAVOUR:{
        const {favour}=payload;
        return {
            ...state,
            data:state.data.concat(favour)};
    }
// -----------remove favour---------------------
    case REMOVE_FAVOUR:{
        const {favour}=payload;
        return {
            ...state,
            data:favour,
        }
    }
// -----------accept favour---------------------
    case ACCEPT_FAVOUR:{
        const {favour}=payload;
        return {
            ...state,
            data:state.data.map(favourItem=>{
            if(!favour){
                return favourItem;
            }
            if(favourItem._id===favour._id){
                return favour;
            }else{
                return favourItem;
            }
        })}
    }
// -----------end favour---------------------
    case END_FAVOUR:{
        const {favour}=payload;
        return{
            ...state,
            data:state.data.map(favourItem=>{
            if(!favour){
                return favourItem;
            }
            if(favourItem._id===favour._id){
                return favour;
            }else{
                return favourItem;
            }
        })
        }
    }
// -----------search favour-------------------
    case SEARCH_FAVOUR:{
        const {favour}=payload;
        return{
            ...state,
            data:favour
        }
    }
// -----------add comment---------------------
    case ADD_COMMENT:{
        const {comment}=payload;
        return{
            ...state,
            data:state.data.map(favourItem=>{
            if(!comment){
                    return favourItem;
                }
            if(favourItem._id===comment.favourID){
                let newFavourItem = {
                    ...favourItem,
                    comments:favourItem.comments.concat(comment)
                }
                return newFavourItem
            }else{
                return favourItem;
            }
            })
        }

        }
// -----------add award---------------------
    case ADD_AWARD:{
        const{award}=payload;
        return{
            ...state,
            data:state.data.map(favourItem=>{
            if(!award){
                    return favourItem;
                }
            if(favourItem._id===award.favourID){
                let newFavourItem = {
                    ...favourItem,
                    follower:favourItem.follower.concat(award)
                }
                return newFavourItem
            }else{
                return favourItem;
            }
            })
        }
    }
// -----------load favour---------------------
    case LOAD_FAVOURS_SUCCESS:{
        const {favours}=payload;
        return {
            isLoading: false,
            data:favours
        };
    }
    case LOAD_FAVOURS_IN_PROGRESS:{
        return{
            ...state,
            isLoading:true,
        }
    }
    case LOAD_FAVOURS_FAILURE:{
        return{
            ...state,
            isLoading:false
        }
    }
    default:{
        return state;
    }
}
}
// -----------create state for award relation---------------------
const initialAwardState = {isLoading:false,data:[]};
export const awards = (state=initialAwardState,action)=>{
    const {type,payload} = action;
    switch(type){
        case CREATE_AWARD_RELATION:{
            const {awardRelation}=payload;
            return{
                ...state,
                data:state.data.concat(awardRelation),
            }
        }
// -------remove award relation------------------------
        case REMOVE_AWARD_RELATION:{
            const {restAward}=payload;
            return{
                ...state,
                data:restAward
            }
        }
// -----------load award relation---------------------
        case LOAD_AWARDS_SUCCESS:{
            const {awards}=payload;
            return {
                isLoading: false,
                data:awards
            };
        }
        case LOAD_AWARDS_IN_PROGRESS:{
            return{
                ...state,
                isLoading:true,
            }
        }
        case LOAD_AWARDS_FAILURE:{
            return{
                ...state,
                isLoading:false
            }
        }
        default:{
            return state;
        }
    }
}

//-------------create state for leader board---------
const initialLeaderBoardState = {
                                members:[]
                                };
export const leaders = (state = initialLeaderBoardState,action) =>{
    const {type,payload} = action;
    if(type === LOAD_LEADER_BOARD){
        const {users} = payload;
        return {
            ...state,
            members:users
        };
    }else{
        return state;
    }
}

//--------------create state for party detection----
const initialPartyState = {
                            users:[]
                          };
export const party = (state = initialPartyState,action) =>{
    const {type,payload} = action;
    if(type === GET_PARTY){
        const {partyInfo} = payload;
        if(partyInfo.length !== 0){
        return {
            ...state,
            users:partyInfo[0].WhoIsInTheParty
            };
        }else{
            return state;
        }
    }else{
        return state;
    }
}