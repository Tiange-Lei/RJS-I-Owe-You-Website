import React, { useState } from 'react';
import { FavourItemContainer, SubmitButton, SubmitButtonContainer } from './styledComponents';
import AwardSelectorModel from './awardSelector';
// ----------------------------------------------------------------------------------------------------------------------

const AddAwardForm = ({ favourID, onAddAwardPressed }) => {
    const [inputValue, setInputValue] = useState({
        favourID: favourID,
        followerName: localStorage.username,
        award: '',
    });
    return (
        <FavourItemContainer>
            <AwardSelectorModel state={inputValue} setStateFunction={setInputValue} />
            <SubmitButtonContainer>
                <SubmitButton onClick={() => onAddAwardPressed(inputValue)}>Submit</SubmitButton>
            </SubmitButtonContainer>
        </FavourItemContainer>
    )
}



export default AddAwardForm;