import React,{useState}from 'react';
import {getFavours} from '../Redux/selectors';
import {FormContainer,NewFavourInput,NewFavourButton,SelectorContainer,DefaultOption} from './styledComponents';
import {connect} from 'react-redux';
import {AddFavoursRequest} from '../Redux/thunks';

const NewFavourForm = ({onCreatePressed})=>{
    const [inputValue,setInputValue] = useState({
        publisher:localStorage.username,
        text:'',
        receiver:'',
        award:'',
        picture:'',
    });
    const CheckInput = (input)=>{
        const {award,text}=input;
        if(award===''){
            alert('Please choose an award!')
            return false
        }
        if(text===''){
            alert('Please input a request!')
            return false
        }
        onCreatePressed(input);
        setInputValue({
            ...inputValue,
            text:'',award:''});
    }
    return(
        <FormContainer>
            <NewFavourInput type='text'
            placeholder='Input your new favour here...' 
            value={inputValue.text}
            onChange={e=>setInputValue(
                {   ...inputValue,
                    text:e.target.value}
            )}
            />
            <SelectorContainer>
            Select award:&nbsp;&nbsp;&nbsp;
            <select
            value={inputValue.award}
            onChange={e=>setInputValue(
                {   ...inputValue,
                    award:e.target.value}
            )}
            >
            <DefaultOption>Choose award below</DefaultOption>
            <option>Coffee</option>
            <option>Chocolate Bar</option>
            <option>Coke</option>
            <option>Biscuit</option>
            </select>
            </SelectorContainer>
            <NewFavourButton onClick={()=>CheckInput(inputValue)}>Post</NewFavourButton>
        </FormContainer>
    )
}
    const mapStateToProps = state =>({
        favours:getFavours(state),
    });
    const mapDispatchToProps = dispatch =>({
        onCreatePressed:favour=>dispatch(AddFavoursRequest(favour)),
    });



export default connect(mapStateToProps,mapDispatchToProps)(NewFavourForm);