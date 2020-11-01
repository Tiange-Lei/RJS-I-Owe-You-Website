import {loadFavoursInProgress,
        loadFavoursSuccess,
        loadFavoursFailure, 
        createFavour,
        removeFavour,
        acceptFavour,
        searchFavour,
        addComment,
        endFavour,
        addAward,
        loadAwardsFailure,
        loadAwardsInProgress,
        loadAwardsSuccess,
        createAwardRelation,
        removeAwardRelation,
        loadLeaderBoard,
        getPartyDet
    } from './action';
// ----------------------------------------------------------------------------------------------------------------------

// ---------------------load favours-------------------------------

export const LoadFavours =(page = 1, size = 5, options, fromRemove = false) => async(dispatch, getState)=>{

    try {
        if (!fromRemove) {
        dispatch(loadFavoursInProgress());
        };
        localStorage.setItem('queryInfo_delete', JSON.stringify({ page, size, options }));
        
        const query = Object.keys(options || {}).map((key) => `${key}=${options[key]}`).join('&')
        const response = await fetch('http://localhost:4000/api/favours?page=' + page + '&size=' + size + '&' + query);
        const favours = await response.json();
        dispatch(loadFavoursSuccess(favours));
    } catch (e) {
        dispatch(loadFavoursFailure());
        dispatch(DisplayAlert(e))
    }

}


export const DisplayAlert=text=>()=>{
    alert(text)
}
// -------------------creat favour-------------------------------
export const AddFavoursRequest =favour=>async dispatch=>{
    try {
        const body = JSON.stringify({favour})
        const response = await fetch('/api/favours',{
            headers:{
            'Content-Type':'Application/json',
            },
            method:'post',
            body,
        });
        const favourItem = await response.json();
        dispatch(createFavour(favourItem));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }

}
// ------------------remove favour-------------------------------
export const RemoveFavoursRequest = favour =>async dispatch=>{
    try {
        const response = await fetch(`/api/favours/${favour._id}`,{
            method:'delete',
        })
        const restFavour = await response.json();
        dispatch(removeFavour(restFavour));
        const reloadData = localStorage.getItem('queryInfo_delete');
        if (reloadData) {
            const { page, size, options } = JSON.parse(reloadData);
            dispatch(LoadFavours(page, size, options, true))
        }
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}
// ------------accept favour------------------------------
export const AcceptFavourRequest = favour =>async dispatch =>{
    let receiver = localStorage.username;
    if(receiver===''){
        alert('Please login fisrt')
    }
    else{
        try {
            const response = await fetch(`/api/favours/${favour._id}/${receiver}/accepted`,{
                method:'post',
            })
            const updatedFavour = await response.json();
            if(!updatedFavour){
                alert('This favour is no longer valid!')
                return
            }
            dispatch(acceptFavour(updatedFavour));
        } catch (e) {
            dispatch(DisplayAlert(e))
        }
    }
}
// ---------------------Search Favour------------------------------------------------------
export const SearchFavoursRequest = keyword =>async dispatch=>{
    try {
        const response = await fetch(`/api/favours/${keyword}`);
        const matchedFavour = await response.json();
        dispatch(searchFavour(matchedFavour));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}

// -----------------------AddAward Request------------------------------------------------
export const AddAwardRequest = favour =>async dispatch =>{
    let receiver = localStorage.username;
    if(receiver===''){
        alert('Please login fisrt')
    }
    else{
        try {
            const body = JSON.stringify(favour);
            const response = await fetch(`/api/favours/${favour.favourID}/awardIncrement`,{
                headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
            });
            const awardItem = await response.json();
            if(!awardItem){
                alert('This favour is no longer valid!')
            }
            dispatch(addAward(awardItem));
        } catch (e) {
            dispatch(DisplayAlert(e))
        }
    }
}



// --------------Prove request(picture should be checked before approval)
export const ProveFavourRequest = favour=>async dispatch=>{
    alert("Proved")
}
// ------------------------comments thunk--------------------------

export const AddCommentRequest =comment=>async dispatch=>{
    try {
        const body = JSON.stringify({comment})
        const response = await fetch(`/api/comment/${comment.favourID}`,{
            headers:{
            'Content-Type':'Application/json',
            },
            method:'post',
            body,
        });
        const commentItem = await response.json();
        if(commentItem===''){
            alert("This favour is no longer valid!")
        }
        dispatch(addComment(commentItem));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }

}
// --------------------------submit provement-----------------------------------
export const SubmitProveRequest = awardRelation =>async dispatch=>{
    try {
        const body = JSON.stringify(awardRelation);
        const response = await fetch(`/api/newAwardRelation`,{
            headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
        })
        const result = await response.json();
        if (result){
            alert("Successfully proved")
            dispatch(endFavour(result));
        }
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}
// --------------Submit award record----------------------------------------------------------------
export const SubmitAwardRecord = awardInfo =>async dispatch=>{
    try {
        const body = JSON.stringify(awardInfo);
        const response = await fetch(`/api/newAwardRelation`,{
            headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
        })
        const result = await response.json();
        if (result){
            alert("Successfully recorded");
            dispatch(createAwardRelation(result));
        }

        dispatch(endFavour(result));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}

// ---------------Load award relation---------------------------------------------
export const LoadAwards =()=>async(dispatch,getState)=>{

    try {
        dispatch(loadAwardsInProgress());
        const response = await fetch('/api/awards');
        const awards = await response.json();
    
        dispatch(loadAwardsSuccess(awards));
    } catch (e) {
        dispatch(loadAwardsFailure());
        dispatch(DisplayAlert(e))
    }

}

// --------------Delete award relation------------------------------------------------
export const RemoveAwardRequest = award => async dispatch=>{
    try {
        const response = await fetch(`/api/awards/${award._id}`,{
            method:'delete',
        })
        const restAwards = await response.json();
        dispatch(removeAwardRelation(restAwards));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}
//----------------Get Party Members-------------------------------------------------
export const getParty = user => async dispatch =>{
    try {
        const response = await fetch(`/api/party/${user}`);
        const result = await response.json();
        dispatch(getPartyDet(result));
    } catch (e) {
        dispatch(DisplayAlert(e));
    }
}
//----------------Get LeaderBoard---------------------------------------------------
export const loadLeadBoard = () => async dispatch =>{
    try{
        const response = await fetch('/api/leadBoard');

        const user = await response.json();
        dispatch(loadLeaderBoard(user));
    }catch(e){
        dispatch(DisplayAlert(e));
    }
}