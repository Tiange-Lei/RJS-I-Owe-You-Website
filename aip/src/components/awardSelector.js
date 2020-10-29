import React from 'react';
import {AwardSelector,DefaultOption} from './styledComponents'
// ----------------------------------------------------------------------------------------------------------------------

// ---------------reusable component for award selection----------------
const AwardSelectorModel=({state,setStateFunction})=>(
    <AwardSelector>
        Select award:&nbsp;&nbsp;&nbsp;
        <select value={state.award} onChange={e=>setStateFunction({
            ...state,
            award:e.target.value
        })}>
        <DefaultOption>Choose award below</DefaultOption>
        <option>Coffee</option>
        <option>Chocolate Bar</option>
        <option>Coke</option>
        <option>Biscuit</option>
        </select>
    </AwardSelector>
)
export default AwardSelectorModel;