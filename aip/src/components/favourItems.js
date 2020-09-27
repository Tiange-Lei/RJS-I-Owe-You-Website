import React from 'react';
import {FavourItemContainer,ButtonContainer,AcceptButton,RemoveButton,FavourPublisher,FavourTime,FavourAward,UserTitle,FavourReceiver} from './styledComponents';
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
        {favour.receiver?<div>Accepted by:&nbsp;<FavourReceiver>{favour.receiver}</FavourReceiver></div>:null}
        <br></br>
        <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
        <ButtonContainer>
            {favour.isAccepted ||favour.publisher===localStorage.username? null:<AcceptButton onClick={()=>onAcceptPressed(favour)}>Accept</AcceptButton>}
            {favour.publisher===localStorage.username?<RemoveButton onClick={()=>onRemovePressed(favour)}>Remove</RemoveButton>:null}
        </ButtonContainer>

    </FavourItemContainer>
)
export default FavourItems;