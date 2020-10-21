import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {FavourItemContainer,ButtonContainer,AcceptButton,RemoveButton,ProveButton,FavourPublisher,FavourTime,FavourAward,UserTitle,FavourReceiver,CommentButton,AddAwardButton} from './styledComponents';
import AddCommentsForm from './addCommentsForm';
import AddAwardForm from './addAwardForm';
import CommentList from './commentsList';


const FavourItems = ({favour,onRemovePressed,onAcceptPressed,onAddCommentPressed,onAddAwardPressed})=>{
    const [isCommentDisplaying, setCommentDisplaying] = useState(false);
    const [isAddAwardDisplaying,setAddAwardDisplaying] = useState(false);
    let isParticipated = false;
    if(favour.follower){
        favour.follower.map((follower)=>{if(follower.name===localStorage.username){isParticipated=true}})
    }
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
        <div>
            follower:{favour.follower.map((follower,key)=><div key={key}>{follower.name}&nbsp;add a &nbsp;{follower.award}</div>)}
        </div>
        <br></br>
        {favour.receiver?<div>Accepted by:&nbsp;<FavourReceiver>{favour.receiver}</FavourReceiver></div>:null}
        {favour.prove ? <div><img src={favour.prove} style={{width:'200px', height:'200px'}}/></div>:null}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {favour.picture ? <div><img src={favour.picture} style={{width:'200px', height:'200px', objectFit:"contain"}}/></div>:null}
        <br></br>
        <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
        
        
        <ButtonContainer>
            {favour.isAccepted ||favour.publisher===localStorage.username||isParticipated? null:<AcceptButton onClick={()=>onAcceptPressed(favour)}>Accept</AcceptButton>}
            {favour.isAccepted ||favour.publisher===localStorage.username||!localStorage.username? null:<AddAwardButton onClick={()=>setAddAwardDisplaying(!isAddAwardDisplaying)}>Add award</AddAwardButton>}
            {favour.publisher===localStorage.username?<RemoveButton onClick={()=>onRemovePressed(favour)}>Remove</RemoveButton>:null}
            {favour.receiver===localStorage.username?favour.isFinished?<div>Finished</div>:<Link to={{pathname:'/prove',state:favour}} style={{textDecoration:'none'}}><ProveButton>prove</ProveButton></Link>:null}
            {localStorage.username?<CommentButton onClick={()=>setCommentDisplaying(!isCommentDisplaying)}>comments</CommentButton>:null}
        </ButtonContainer>
    </FavourItemContainer>
    {isCommentDisplaying?<FavourItemContainer><CommentList coms={favour.comments}/><AddCommentsForm favourID={favour._id} onAddCommentPressed={onAddCommentPressed}/></FavourItemContainer>:null}
    {isAddAwardDisplaying?<AddAwardForm favourID={favour._id} onAddAwardPressed={onAddAwardPressed}/>:null}
    </div>
)
}

export default FavourItems;