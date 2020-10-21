import React,{useState}from 'react';
import {getFavours} from '../Redux/selectors';
import {FormContainer,NewFavourButton,SelectorContainer,DefaultOption} from './styledComponents';
import {connect} from 'react-redux';
import {AddFavoursRequest} from '../Redux/thunks';
import {Input} from 'antd';

const  {TextArea} = Input;

const NewFavourForm = ({onCreatePressed})=>{
    const [inputValue,setInputValue] = useState({
        publisher:localStorage.username,
        text:'',
        receiver:'',
        award:'',
        picture:'',
    });
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
                        setInputValue({
                            ...inputValue,
                            picture:imageBase64,
                        })
                    }

                }
        }
        else{
            setInputValue({
                ...inputValue,
                picture:''
            })
        }
}
    const CheckInput = (input)=>{
        const regex = RegExp('^[a-zA-Z0-9,.!? ]*$');
        const {award,text}=input;
        if(!regex.test(text)){
            alert("You input contains illegal characters,please try again")
            return false
        }
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
            text:'',
            award:'',
            picture:''
        });
    }
    return(
        <FormContainer>
            <div>Post a request:</div>
            <TextArea
            placeholder='Input your new favour here...' 
            showCount
            maxLength={100}
            value={inputValue.text}
            onChange={e=>setInputValue(
                {   ...inputValue,
                    text:e.target.value}
            )
            }
            
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
            <div>Prove:</div>
            {/* <UploadImageButton /> */}
            <input type='file' id='images' accept='image/*' onChange={e=>loadHandler(e)}/>
            <img src={inputValue.picture?inputValue.picture:null} />
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