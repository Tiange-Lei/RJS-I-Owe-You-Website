import {loadFavoursInProgress,
        loadFavoursSuccess,
        loadFavoursFailure, 
        createFavour,
        removeFavour,
        acceptFavour,
        addComment,
    } from './action';




export const LoadFavours =()=>async(dispatch,getState)=>{

    try {
        dispatch(loadFavoursInProgress());
        const response = await fetch('http://localhost:4000/favours');
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

export const AddFavoursRequest =favour=>async dispatch=>{
    try {
        const body = JSON.stringify({favour})
        const response = await fetch('http://localhost:4000/favours',{
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

export const RemoveFavoursRequest = favour =>async dispatch=>{
    try {
        const response = await fetch(`http://localhost:4000/favours/${favour._id}`,{
            method:'delete',
        })
        const restFavour = await response.json();
        dispatch(removeFavour(restFavour));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}

export const AcceptFavourRequest = favour =>async dispatch =>{
    let receiver = localStorage.username;
    if(receiver===''){
        alert('Please login fisrt')
    }
    else{
        try {
            const response = await fetch(`http://localhost:4000/favours/${favour._id}/${receiver}/accepted`,{
                method:'post',
            })
            const updatedFavour = await response.json();
            dispatch(acceptFavour(updatedFavour));
        } catch (e) {
            dispatch(DisplayAlert(e))
        }
    }
}

export const ProveFavourRequest = favour=>async dispatch=>{
    alert("Proved")
}
// ------------------------comments thunk--------------------------

export const AddCommentRequest =comment=>async dispatch=>{
    try {
        const body = JSON.stringify({comment})
        const response = await fetch(`http://localhost:4000/addcomment/${comment.favourID}`,{
            headers:{
            'Content-Type':'Application/json',
            },
            method:'post',
            body,
        });
        const commentItem = await response.json();
        dispatch(addComment(commentItem));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }

}
