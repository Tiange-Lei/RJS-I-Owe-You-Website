import React,{useState} from 'react';
import {AwardRelationContainer} from './styledComponents';
import ProveAwardForm from './proveAwardForm';
// ----------------------------------------------------------------------------------------------------------------------

const AwardRelationItem=({award,onRemovePressed})=>{
    const [isProveButtonClicked,setIsproveButtonClicked]=useState(false);
    return(
        <AwardRelationContainer>
            <div>
            {award.debtor} owe {award.creditor} a {award.award}
            {award.debtor===localStorage.username?<button onClick={()=>setIsproveButtonClicked(!isProveButtonClicked)}>Prove</button>:<button onClick={()=>onRemovePressed(award)}>Complete</button>}
            </div>
            {isProveButtonClicked?<ProveAwardForm  award={award} onRemovePressed={onRemovePressed}/>:null}
        </AwardRelationContainer>
    )
}

export default AwardRelationItem;