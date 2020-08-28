import {CREATE_FAVOUR,
        REMOVE_FAVOUR, 
        ACCEPT_FAVOUR,
        LOAD_FAVOURS_IN_PROGRESS,
        LOAD_FAVOURS_SUCCESS,
        LOAD_FAVOURS_FAILURE,
    } from './action';



const initialState = {isLoading:false,data:[]};

export const favours = (state=initialState,action)=>{
    const {type,payload} = action;
    switch(type){
        case CREATE_FAVOUR:{
            const {favour}=payload;
            return {
                ...state,
                data:state.data.concat(favour)};
        }
        case REMOVE_FAVOUR:{
            const {favour}=payload;
            return {
                ...state,
                data:state.data.filter(favourItem=>favourItem.id !==favour.id)}
        }
        case ACCEPT_FAVOUR:{
            const {favour}=payload;
            return {
                ...state,
                data:state.data.map(favourItem=>{
                if(favourItem.id===favour.id){
                    return favour;
                }else{
                    return favourItem;
                }
            })}
        }
        case LOAD_FAVOURS_SUCCESS:{
            const {favours}=payload;
            return {
                ...favours,
                isLoading: false,
                data:favours};
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