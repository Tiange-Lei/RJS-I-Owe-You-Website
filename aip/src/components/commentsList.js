import React from 'react';
// ----------------------------------------------------------------------------------------------------------------------

const CommentsList = ({coms})=>{
    const content=(
        <div>
            {coms.map((comment,key)=>
            <div key={key}>
            <div>{comment.username}</div>
            <div>{comment.commentText}</div>
            </div>
            )}
        </div>
    )
    return content;

}

export default CommentsList;
