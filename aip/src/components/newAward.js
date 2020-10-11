import React from 'react';
import {FormContainer,SelectorContainer,DefaultOption} from './styledComponents';

const NewAwardForm=()=>{
return(
    <FormContainer>
        <div>I owe u:</div>
        <div>Deptor:</div>
        <div>{localStorage.username}</div>
        <div>Creditor:</div>
        <input type='text'/>
        <SelectorContainer>
            Select award:&nbsp;&nbsp;&nbsp;
            <select>
            <DefaultOption>Choose award below</DefaultOption>
            <option>Coffee</option>
            <option>Chocolate Bar</option>
            <option>Coke</option>
            <option>Biscuit</option>
            </select>
        </SelectorContainer>
        <div>U owe me:</div>
        <div>Deptor:</div>
        <input type='text'/>
        <div>Creditor:</div>
        <div>{localStorage.username}</div>
        <SelectorContainer>
            Select award:&nbsp;&nbsp;&nbsp;
            <select>
            <DefaultOption>Choose award below</DefaultOption>
            <option>Coffee</option>
            <option>Chocolate Bar</option>
            <option>Coke</option>
            <option>Biscuit</option>
            </select>
        </SelectorContainer>
    </FormContainer>
)
}
export default NewAwardForm;
