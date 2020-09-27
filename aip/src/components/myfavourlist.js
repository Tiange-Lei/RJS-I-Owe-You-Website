import React,{useEffect} from 'react';
import FavourItems from './favourItems';
import {getFavoursLoading,getValidFavours,getInvalidFavours} from '../Redux/selectors';
import {LoadFavours,RemoveFavoursRequest,AcceptFavourRequest} from '../Redux/thunks';
import {ListWrapper} from './styledComponents';
import {connect} from 'react-redux';

const MyList = ({validFavours,invalidFavours,isLoading,onRemovePressed,onAcceptPressed,onDisplayAlertClicker,startLoadingFavours})=>{
    
    useEffect(()=>{
        startLoadingFavours();
    },[startLoadingFavours] );
    const LoadingMessage = <div>Is loading...</div>
    const content= (
    <ListWrapper>
        <br></br>
        <h3>Valid Favours:</h3>
        {validFavours.map((favour,key)=>{
        if(favour.publisher===localStorage.username){
            return (<FavourItems 
                        favour={favour} 
                        key={key}
                        onRemovePressed={onRemovePressed}
                        onAcceptPressed={onAcceptPressed}
                        onDisplayAlertClicker={onDisplayAlertClicker}
                    />)
        }
        else{
            return null;
        }
    })}
        <br></br>
        <h3>Invalid Favours:</h3>
        {invalidFavours.map((favour,key)=>{
            if (favour.publisher===localStorage.username){
                return (<FavourItems 
                            favour={favour} 
                            key={key}
                            onRemovePressed={onRemovePressed}
                            onAcceptPressed={onAcceptPressed}
                            onDisplayAlertClicker={onDisplayAlertClicker}
                        />
                        )
            }
            else{
                return null;
            }})}
        <br></br>
        <h3>What I accepted:</h3>
        {invalidFavours.map((favour,key)=>{
            if (favour.receiver===localStorage.username){
                return (<FavourItems 
                            favour={favour} 
                            key={key}
                            onRemovePressed={onRemovePressed}
                            onAcceptPressed={onAcceptPressed}
                            onDisplayAlertClicker={onDisplayAlertClicker}
                        />
                        )
            }
            else{
                return null;
            }})}
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



export default connect(mapStateToProps,mapDispatchToProps)(MyList);