import React,{useEffect} from 'react';
import FavourItems from './favourItems';
import {getFavoursLoading,getValidFavours,getInvalidFavours} from '../Redux/selectors';
import {LoadFavours,RemoveFavoursRequest,AcceptFavourRequest} from '../Redux/thunks';
import {ListWrapper} from './styledComponents';
import {connect} from 'react-redux';

const FavourList = ({validFavours,invalidFavours,isLoading,onRemovePressed,onAcceptPressed,onDisplayAlertClicker,startLoadingFavours})=>{
    
    useEffect(()=>{
        startLoadingFavours();
    },[startLoadingFavours] );
    const LoadingMessage = <div>Is loading...</div>
    const content= (
    <ListWrapper>
        <h3>Valid Favours:</h3>
        {validFavours.map((favour,key)=><FavourItems 
        favour={favour} 
        key={key}
        onRemovePressed={onRemovePressed}
        onAcceptPressed={onAcceptPressed}
        onDisplayAlertClicker={onDisplayAlertClicker}
        />)}
        <br></br>
        <h3>Invalid Favours:</h3>
        {invalidFavours.map((favour,key)=><FavourItems 
        favour={favour} 
        key={key}
        onRemovePressed={onRemovePressed}
        onAcceptPressed={onAcceptPressed}
        onDisplayAlertClicker={onDisplayAlertClicker}
        />)}
    </ListWrapper>
    )
    return isLoading?LoadingMessage:content;
}; 

const mapStateToProps = state =>({
    isLoading: getFavoursLoading(state),
    validFavours:getValidFavours(state),
    invalidFavours:getInvalidFavours(state),
});
const mapDispatchToProps = dispatch =>({
    startLoadingFavours:()=>dispatch(LoadFavours()),
    onRemovePressed: favour=>dispatch(RemoveFavoursRequest(favour)),
    onAcceptPressed: favour=>dispatch(AcceptFavourRequest(favour)),

})



export default connect(mapStateToProps,mapDispatchToProps)(FavourList);