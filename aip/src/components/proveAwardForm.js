import React,{useState} from 'react';
import LoadImageHandler from './loadImageHandler';
// ----------------------------------------------------------------------------------------------------------------------

const ProveAwardForm = ({award,onRemovePressed})=>{
    const [img,setImg]=useState('');
    const onSubmit=award=>{
        if(img===''){
            alert('Please upload a image as proof')
        }
        else{
            onRemovePressed(award);
            setImg('')
        }
    }
    return(
        <div>
            <div>Prove:</div>
            <input type='file' id='images' accept='image/*' onChange={e=>LoadImageHandler(e,img,setImg,3)}/>
            {img?<img src={img} style={{width:'200px',height:'200px',objectFit:"contain"}} alt={''}/>:null}
            <button onClick={()=>onSubmit(award)}>Submit</button>
        </div>
    )
}
export default ProveAwardForm;