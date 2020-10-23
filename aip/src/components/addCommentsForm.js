import React,{useState} from 'react';
import {FavourItemContainer} from './styledComponents';

const AddCommentsForm = ({favourID,onAddCommentPressed})=>{
    const [inputValue, setInputValue] = useState({
        favourID: favourID,
        username:localStorage.username,
        commentText:"",
    });
    const AddComment=input=>{
        const regex = RegExp('^[a-zA-Z0-9\s.!?"-]+$');
        const {commentText}=input;
        if(!regex.test(commentText)){
            alert("You input contains illegal characters,please try again")
            return false
        }
        onAddCommentPressed(input)
    }
    return (
            <FavourItemContainer>
                <textarea rows="2" placeholder="comments:" value={inputValue.commentText} onChange={(e)=>{
                    setInputValue({
                        ...inputValue,
                        commentText:e.target.value})
                        }}/>
                <button onClick={()=>AddComment(inputValue)}>Add comment</button>
            </FavourItemContainer>
    )
}



export default AddCommentsForm;