import React from 'react';

const ProveAwardForm = ({award,onRemovePressed})=>{
    return(
        <div>
            <div>Prove:</div>
            <input type='file' id='images' accept='image/*'/>
            <button onClick={()=>onRemovePressed(award)}>Submit</button>
        </div>
    )
}
export default ProveAwardForm;