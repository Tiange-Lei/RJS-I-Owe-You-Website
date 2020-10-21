import React,{useState} from 'react';

const ProveAwardForm = ({award,onRemovePressed})=>{
    const [img,setImg]=useState('');

    const loadHandler=e=>{
        const reader = new FileReader();
        const file=  e.target.files[0];
        if(file){
                reader.readAsDataURL(file);
                reader.onload=function(){
                    const AllowImgFileSize = 1078702;
                    const imageBase64=this.result;
                    if(AllowImgFileSize!==0&&AllowImgFileSize<imageBase64.length){
                        alert("The size of your uploaded image should be less than 2MB")
                        return
                    }
                    else{
                        setImg(imageBase64)
                    }

                }
        }
        else{
            setImg('')
        }
    }
    const onSubmit=award=>{
        if(img===''){
            alert('Please upload a image as proof')
        }
        else{
            onRemovePressed(award)
        }
    }
    return(
        <div>
            <div>Prove:</div>
            <input type='file' id='images' accept='image/*' onChange={e=>loadHandler(e)}/>
            {img?<img src={img} style={{width:'200px',height:'200px',objectFit:"contain"}}/>:null}
            <button onClick={()=>onSubmit(award)}>Submit</button>
        </div>
    )
}
export default ProveAwardForm;