import React from 'react';
import {FavourItemContainer,ButtonContainer,AcceptButton,RemoveButton,FavourPublisher,FavourTime,FavourAward,UserTitle} from './styledComponents';
const FavourItems = ({favour,onRemovePressed,onAcceptPressed,})=>(
    <FavourItemContainer>
        <UserTitle>
            <FavourPublisher>{favour.publisher}</FavourPublisher>  
        </UserTitle>
        <br></br>
        <div>Request:&nbsp;{favour.text}</div>
        <br></br>
        <div>award:&nbsp;<FavourAward>{favour.award}</FavourAward></div>
        <br></br>
        <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
        <ButtonContainer>
            {favour.isAccepted? null:<AcceptButton onClick={()=>onAcceptPressed(favour)}>Accept</AcceptButton>}
            <RemoveButton onClick={()=>onRemovePressed(favour)}>Remove</RemoveButton>
        </ButtonContainer>

    </FavourItemContainer>
)
export default FavourItems;