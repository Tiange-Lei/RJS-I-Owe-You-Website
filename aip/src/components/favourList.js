import React,{useEffect} from 'react';
import FavourItems from './favourItems';
import {getFavoursLoading,getValidFavours,getInvalidFavours,getSearchedFavours} from '../Redux/selectors';
import {LoadFavours,RemoveFavoursRequest,AcceptFavourRequest,AddCommentRequest,AddAwardRequest} from '../Redux/thunks';
import {ListWrapper,ValidFavour,InvalidFavour} from './styledComponents';
import {connect} from 'react-redux';

const FavourList = ({page, size, options, validFavours,invalidFavours,isLoading,onRemovePressed,onAcceptPressed,onDisplayAlertClicker,startLoadingFavours,onAddCommentPressed,onAddAwardPressed})=>{
    useEffect(()=>{
        startLoadingFavours(page, size, options,);      
    },[startLoadingFavours, page, size] );
    const LoadingMessage = <div>Is loading...</div>
    const content= (
    <ListWrapper>
        <ValidFavour>
            <h3>Valid Favours:</h3>
            {validFavours.map((favour,key)=><FavourItems 
            favour={favour} 
            key={key}
            onRemovePressed={onRemovePressed}
            onAcceptPressed={onAcceptPressed}
            onDisplayAlertClicker={onDisplayAlertClicker}
            onAddCommentPressed={onAddCommentPressed}
            onAddAwardPressed={onAddAwardPressed}
        />)}
        </ValidFavour>
        <br></br>
        <InvalidFavour>
            <h3>Invalid Favours:</h3>
            {invalidFavours.map((favour,key)=><FavourItems 
            favour={favour} 
            key={key}
            onRemovePressed={onRemovePressed}
            onAcceptPressed={onAcceptPressed}
            onDisplayAlertClicker={onDisplayAlertClicker}
            onAddCommentPressed={onAddCommentPressed}
            />)}
        </InvalidFavour>
        <div>
            {/* {matchedFavours.map((favour,key)=><FavourItems
                        favour={favour} 
                        key={key}
                        onRemovePressed={onRemovePressed}
                        onAcceptPressed={onAcceptPressed}
                        onDisplayAlertClicker={onDisplayAlertClicker}
                        onAddCommentPressed={onAddCommentPressed}
                        />)} */}
        </div>
    </ListWrapper>
    )
    return isLoading?LoadingMessage:content;
}; 

const mapStateToProps = state =>({
    // isLoading:state.favours.isLoading,
    // validFavours:state.favours.data.filter(favour=>!favour.isAccepted),
    // invalidFavours:state.favours.data.filter(favour=>favour.isAccepted),

    isLoading: getFavoursLoading(state),
    validFavours:getValidFavours(state),
    invalidFavours:getInvalidFavours(state),
});
const mapDispatchToProps = dispatch =>({
    startLoadingFavours:(page, size, options)=>dispatch(LoadFavours(page, size, options)),
    onRemovePressed: favour=>dispatch(RemoveFavoursRequest(favour)),
    onAcceptPressed: favour=>dispatch(AcceptFavourRequest(favour)),
    onAddCommentPressed: comment=>dispatch(AddCommentRequest(comment)),
    onAddAwardPressed: award=>dispatch(AddAwardRequest(award))
})



export default connect(mapStateToProps,mapDispatchToProps)(FavourList);