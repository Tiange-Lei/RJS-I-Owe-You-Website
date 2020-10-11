import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {FavourItemContainer,ButtonContainer,AcceptButton,RemoveButton,ProveButton,FavourPublisher,FavourTime,FavourAward,UserTitle,FavourReceiver,CommentButton} from './styledComponents';
import AddCommentsForm from './addCommentsForm';
import CommentList from './commentsList';


const FavourItems = ({favour,onRemovePressed,onAcceptPressed,onAddCommentPressed})=>{
    const [isDisplaying, setDisplaying] = useState(false);
    return(
    <div>
    <br></br>
    <FavourItemContainer>
        <UserTitle>
            <FavourPublisher>{favour.publisher}</FavourPublisher>  
        </UserTitle>
        <br></br>
        <div>Request:&nbsp;{favour.text}</div>
        <br></br>
        <div>award:&nbsp;<FavourAward>{favour.award}</FavourAward></div>
        <br></br>
        {favour.receiver?<div>Accepted by:&nbsp;<FavourReceiver>{favour.receiver}</FavourReceiver></div>:null}
        <br></br>
        <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
        <ButtonContainer>
            {favour.isAccepted ||favour.publisher===localStorage.username? null:<AcceptButton onClick={()=>onAcceptPressed(favour)}>Accept</AcceptButton>}
            {favour.publisher===localStorage.username?<RemoveButton onClick={()=>onRemovePressed(favour)}>Remove</RemoveButton>:null}
            {favour.receiver===localStorage.username?favour.isFinished?<div>Finished</div>:<Link to={{pathname:'/prove',state:favour}} style={{textDecoration:'none'}}><ProveButton>prove</ProveButton></Link>:null}
            <CommentButton onClick={()=>setDisplaying(!isDisplaying)}>comments</CommentButton>
        </ButtonContainer>
    </FavourItemContainer>
    {isDisplaying?<FavourItemContainer><CommentList coms={favour.comments}/><AddCommentsForm favourID={favour._id} onAddCommentPressed={onAddCommentPressed}/></FavourItemContainer>:null}
    </div>
)
}

export default FavourItems;