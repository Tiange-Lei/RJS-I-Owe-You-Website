import React from 'react';
import {ListWrapper,ValidFavour,InvalidFavour,UserAcceptedFavour} from './styledComponents';
import FavourItems from './favourItems';
// ----------------------------------------------------------------------------------------------------------------------

const FavourContent = ({validFavours,invalidFavours,onRemovePressed,onAcceptPressed,onDisplayAlertClicker,onAddCommentPressed,onAddAwardPressed,index})=>(
        // ----reuse component favour list and check if it is used on homepage,then display corresponding content-------------
        <div>    
        {index==='home'?validFavours.length?
            <ListWrapper>
                <ValidFavour>
                    <h3>Valid Favours:</h3>
                        {validFavours.map((favour,key)=>
                            <FavourItems 
                            favour={favour} 
                            key={key}
                            onRemovePressed={onRemovePressed}
                            onAcceptPressed={onAcceptPressed}
                            onDisplayAlertClicker={onDisplayAlertClicker}
                            onAddCommentPressed={onAddCommentPressed}
                            onAddAwardPressed={onAddAwardPressed}
                            />
                        )}
                </ValidFavour>
            </ListWrapper>
            :<div>There is no valid favours</div>
        :null}
        {/* reuse component favour list and check if it is used on mypage, then display corresponding content  */}
        {index==='mypage'?
            <ListWrapper>
                <ValidFavour>
                    <h3>On Board:</h3>
                    {/* favours on board, which are posted by the current user and no one accept*/}
                    {validFavours.map((favour,key)=>{
                        if(favour.publisher===localStorage.username){
                            return (<FavourItems 
                                        favour={favour} 
                                        key={key}
                                        onRemovePressed={onRemovePressed}
                                        onAcceptPressed={onAcceptPressed}
                                        onDisplayAlertClicker={onDisplayAlertClicker}
                                        onAddCommentPressed={onAddCommentPressed}
                                    />)
                        }
                        else{
                            return null;
                        }
                    })}
                </ValidFavour>
                <br></br>
                <InvalidFavour>
                    <h3>Accepted by others:</h3>
                    {/* favours posted by current user and accepted by others */}
                    {invalidFavours.map((favour,key)=>{
                            if (favour.publisher===localStorage.username){
                                return (<FavourItems 
                                            favour={favour} 
                                            key={key}
                                            onRemovePressed={onRemovePressed}
                                            onAcceptPressed={onAcceptPressed}
                                            onDisplayAlertClicker={onDisplayAlertClicker}
                                            onAddCommentPressed={onAddCommentPressed}
                                        />
                                        )
                            }
                            else{
                                return null;
                            }
                    })}
                </InvalidFavour>
                <br></br>
                <UserAcceptedFavour>
                    <h3>What I accepted:</h3>
                    {/* favours posted by others but accept by current user */}
                    {invalidFavours.map((favour,key)=>{
                            if (favour.receiver===localStorage.username){
                                return (<FavourItems 
                                            favour={favour} 
                                            key={key}
                                            onRemovePressed={onRemovePressed}
                                            onAcceptPressed={onAcceptPressed}
                                            onDisplayAlertClicker={onDisplayAlertClicker}
                                            onAddCommentPressed={onAddCommentPressed}
                                        />
                                        )
                            }
                            else{
                                return null;
                            }
                    })}
                </UserAcceptedFavour>
        </ListWrapper>
        :null}
</div>
)
export default FavourContent;