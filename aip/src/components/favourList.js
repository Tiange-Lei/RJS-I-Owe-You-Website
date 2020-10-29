import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import FavourContent from './favourContent';
import {getFavoursLoading,getValidFavours,getInvalidFavours} from '../Redux/selectors';
import {LoadFavours,
        RemoveFavoursRequest,
        AcceptFavourRequest,
        AddCommentRequest,
        AddAwardRequest,
        } from '../Redux/thunks';
// ----------------------------------------------------------------------------------------------------------------------

const FavourList = ({validFavours,
                    invalidFavours,
                    isLoading,
                    onRemovePressed,
                    onAcceptPressed,
                    onDisplayAlertClicker,
                    startLoadingFavours,
                    onAddCommentPressed,
                    onAddAwardPressed,
                    index})=>{
                                useEffect(()=>{
                                    startLoadingFavours();      
                                },[startLoadingFavours] );
                                const LoadingMessage = <div>Is loading...</div>
                                return isLoading?LoadingMessage:index==='home'?
                                        <FavourContent 
                                            validFavours={validFavours} 
                                            onRemovePressed={onRemovePressed} 
                                            onAcceptPressed={onAcceptPressed} 
                                            onDisplayAlertClicker={onDisplayAlertClicker} 
                                            onAddAwardPressed={onAddAwardPressed} 
                                            onAddCommentPressed={onAddCommentPressed}
                                            index={index}/>
                                            :index==='mypage'?<FavourContent
                                                                validFavours={validFavours} 
                                                                invalidFavours={invalidFavours}
                                                                onRemovePressed={onRemovePressed} 
                                                                onAcceptPressed={onAcceptPressed} 
                                                                onDisplayAlertClicker={onDisplayAlertClicker} 
                                                                onAddAwardPressed={onAddAwardPressed} 
                                                                onAddCommentPressed={onAddCommentPressed}
                                                                index={index}
                                                                />:null
                    }; 

const mapStateToProps = state =>({
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