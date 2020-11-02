import React, { useState } from 'react';
import { getFavours } from '../Redux/selectors';
import { FormContainer, NewFavourButton, PictureContainer } from './styledComponents';
import { connect } from 'react-redux';
import { AddFavoursRequest } from '../Redux/thunks';
import { Input } from 'antd';
import AwardSelectorModel from './awardSelector';
import loadImageHandler from './loadImageHandler';
// ----------------------------------------------------------------------------------------------------------------------

const { TextArea } = Input;

const NewFavourForm = ({ onCreatePressed }) => {
    const [inputValue, setInputValue] = useState({
        publisher: localStorage.username,
        text: '',
        receiver: '',
        award: '',
        picture: '',
    });
    const CheckInput = (input) => {
        const regex = RegExp('^[a-zA-Z0-9,.!? ]*$');
        const { award, text } = input;
        if (!regex.test(text)) {
            alert("You input contains illegal characters,please try again")
            return false
        }
        if (award === '') {
            alert('Please choose an award!')
            return false
        }
        if (text === '') {
            alert('Please input a request!')
            return false
        }
        onCreatePressed(input);
        setInputValue({
            ...inputValue,
            text: '',
            award: '',
            picture: ''
        });
    }
    return (
        <FormContainer>
            <div>Post a request:</div>
            <TextArea
                placeholder='Input your new favour here...'
                showCount
                maxLength={100}
                value={inputValue.text}
                onChange={e => setInputValue(
                    {
                        ...inputValue,
                        text: e.target.value
                    }
                )
                }
            />
            <AwardSelectorModel state={inputValue} setStateFunction={setInputValue} />
            <PictureContainer>
                Picture:&nbsp;&nbsp;&nbsp;
                <input type='file' id='images' accept='image/*' onChange={e => loadImageHandler(e, inputValue, setInputValue, 2)} />
            </PictureContainer>
            <div>
                <img src={inputValue.picture ? inputValue.picture : null} alt={''} />
            </div>
            <NewFavourButton onClick={() => CheckInput(inputValue)}>Post</NewFavourButton>
        </FormContainer>
    )
}
const mapStateToProps = state => ({
    favours: getFavours(state),
});
const mapDispatchToProps = dispatch => ({
    onCreatePressed: favour => dispatch(AddFavoursRequest(favour)),
});



export default connect(mapStateToProps, mapDispatchToProps)(NewFavourForm);