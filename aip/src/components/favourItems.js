import React from 'react';
import {FavourItemContainer,ButtonContainer,AcceptButton,RemoveButton,} from './styledComponents';
const FavourItems = ({favour,onRemovePressed,onAcceptPressed,})=>(
    <FavourItemContainer>
        <div>{favour.publisher}</div>
        <div>Request:&nbsp;{favour.text}</div>
        <br></br>
        <div>award:&nbsp;{favour.award}</div>
        <ButtonContainer>
            {favour.isAccepted? null:<AcceptButton onClick={()=>onAcceptPressed(favour)}>Accept</AcceptButton>}
            <RemoveButton onClick={()=>onRemovePressed(favour)}>Remove</RemoveButton>
        </ButtonContainer>

    </FavourItemContainer>
)
export default FavourItems;