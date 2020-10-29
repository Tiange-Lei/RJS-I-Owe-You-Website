import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import AddCommentsForm from './addCommentsForm';
import AddAwardForm from './addAwardForm';
import CommentList from './commentsList';
import {FavourItemContainer,
        ButtonContainer,
        AcceptButton,
        RemoveButton,
        ProveButton,
        FavourPublisher,
        FavourTime,
        FavourAward,
        UserTitle,
        FavourReceiver,
        CommentButton,
        AddAwardButton,
    } from './styledComponents';
// ----------------------------------------------------------------------------------------------------------------------


const FavourItems = ({favour,onRemovePressed,onAcceptPressed,onAddCommentPressed,onAddAwardPressed})=>{
    // small state only for the displaying of comment and add award
    const [isDisplaying, setDisplaying] = useState({
        comment:false,
        addAward:false,
    });
    return(
        <div>
            {/* regular displaying the information of request */}
        <FavourItemContainer>
            <UserTitle>
                <FavourPublisher>{favour.publisher}</FavourPublisher>  
            </UserTitle>
            <div>Request:&nbsp;{favour.text}</div>
            <div>Award:&nbsp;<FavourAward>{favour.award}</FavourAward></div>
            <div>
                Follower:{favour.follower.map((follower,key)=><div key={key}>{follower.name}&nbsp;add a &nbsp;{follower.award}</div>)}
            </div>
            {favour.receiver?<div>Accepted by:&nbsp;<FavourReceiver>{favour.receiver}</FavourReceiver></div>:null}
            {favour.picture?
            <div>
                <div>
                Picture:
                </div>
                {favour.picture?<img src={favour.picture} style={{width:'200px',height:'200px',objectFit:"contain"}} alt={''}/>:null}           
            </div>
            :null}
            {favour.isFinished?
            <div>
                <div>
                Prove:
                </div>
                {favour.prove?<img src={favour.prove} style={{width:'200px',height:'200px',objectFit:"contain"}} alt={''}/>:null}
            </div>
            :null}
            <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
            
            {/* logics of displaying buttons according to different situation */}
            <ButtonContainer>
                {favour.isAccepted ||favour.publisher===localStorage.username||favour.follower.find(follower=>follower.name===localStorage.username)? null:<AcceptButton onClick={()=>onAcceptPressed(favour)}>Accept</AcceptButton>}
                {favour.isAccepted ||favour.publisher===localStorage.username||!localStorage.username? null:<AddAwardButton onClick={()=>setDisplaying({...isDisplaying,addAward:!isDisplaying.addAward})}>Add award</AddAwardButton>}
                {favour.publisher===localStorage.username?<RemoveButton onClick={()=>onRemovePressed(favour)}>Remove</RemoveButton>:null}
                {favour.receiver===localStorage.username?favour.isFinished?<div>Finished</div>:<Link to={{pathname:'/prove',state:favour}} style={{textDecoration:'none'}}><ProveButton>prove</ProveButton></Link>:null}
                {localStorage.username?<CommentButton onClick={()=>setDisplaying({...isDisplaying,comment:!isDisplaying.comment})}>comments</CommentButton>:null}
            </ButtonContainer>
        </FavourItemContainer>
                {isDisplaying.comment?<FavourItemContainer><CommentList coms={favour.comments}/><AddCommentsForm favourID={favour._id} onAddCommentPressed={onAddCommentPressed}/></FavourItemContainer>:null}
                {isDisplaying.addAward?<AddAwardForm favourID={favour._id} onAddAwardPressed={onAddAwardPressed}/>:null}
        </div>
)
}

export default FavourItems;