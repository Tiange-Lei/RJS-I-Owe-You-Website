import {loadFavoursInProgress,
        loadFavoursSuccess,
        loadFavoursFailure, 
        createFavour,
        removeFavour,
        acceptFavour,
        addComment,
        endFavour,
    } from './action';




export const LoadFavours =()=>async(dispatch,getState)=>{

    try {
        dispatch(loadFavoursInProgress());
        const response = await fetch('http://localhost:4000/api/favours');
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
        const response = await fetch('http://localhost:4000/api/favours',{
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
        const response = await fetch(`http://localhost:4000/api/favours/${favour._id}`,{
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
            const response = await fetch(`http://localhost:4000/api/favours/${favour._id}/${receiver}/accepted`,{
                method:'post',
            })
            const updatedFavour = await response.json();
            if(!updatedFavour){
                alert('This favour is no longer valid!')
            }
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
        const response = await fetch(`http://localhost:4000/api/comment/${comment.favourID}`,{
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
        const response = await fetch(`http://localhost:4000/api/newAwardRelation`,{
            headers:{
                'Content-Type':'Application/json',
                },
                method:'post',
                body,
        })
        const result = await response.json();
        if (result){
            alert("Successfully proved")
        }
        dispatch(endFavour(result));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}