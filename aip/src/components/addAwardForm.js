import React,{useState} from 'react';
import {FavourItemContainer,SelectorContainer,DefaultOption} from './styledComponents';

const AddAwardForm = ({favourID,onAddAwardPressed})=>{
    const [inputValue, setInputValue] = useState({
        favourID: favourID,
        followerName:localStorage.username,
        award:'',
    });
    return (
            <FavourItemContainer>
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
                <button onClick={()=>onAddAwardPressed(inputValue)}>Submit</button>
            </FavourItemContainer>
    )
}



export default AddAwardForm;