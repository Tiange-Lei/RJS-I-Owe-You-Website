import {loadFavoursInProgress,
        loadFavoursSuccess,
        loadFavoursFailure, 
        createFavour,
        removeFavour,
        acceptFavour,
    } from './action';




export const LoadFavours =()=>async(dispatch,getState)=>{

    try {
        dispatch(loadFavoursInProgress());
        const response = await fetch('http://localhost:8000/favours');
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
        const response = await fetch('http://localhost:8000/favours',{
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
        const response = await fetch(`http://localhost:8000/favours/${favour.id}`,{
            method:'delete',
        })
        const removedFavour = await response.json();
        dispatch(removeFavour(removedFavour));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}

export const AcceptFavourRequest = favour =>async dispatch =>{
    try {
        const response = await fetch(`http://localhost:8000/favours/${favour.id}/accepted`,{
            method:'post',
        })
        const updatedFavour = await response.json();
        dispatch(acceptFavour(updatedFavour));
    } catch (e) {
        dispatch(DisplayAlert(e))
    }
}