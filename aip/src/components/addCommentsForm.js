import React,{useState} from 'react';
import {FavourItemContainer} from './styledComponents';

const AddCommentsForm = ({favourID,onAddCommentPressed})=>{
    const [inputValue, setInputValue] = useState({
        favourID: favourID,
        username:localStorage.username,
        commentText:"",
    });
    return (
            <FavourItemContainer>
                <textarea rows="2" placeholder="comments:" value={inputValue.commentText} onChange={(e)=>{
                    setInputValue({
                        ...inputValue,
                        commentText:e.target.value})
                        }}/>
                <button onClick={()=>onAddCommentPressed(inputValue)}>Add comment</button>
            </FavourItemContainer>
    )
}



export default AddCommentsForm;