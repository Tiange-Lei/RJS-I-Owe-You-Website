import React,{useState} from 'react';
import {FavourItemContainer,FavourPublisher,FavourTime,FavourAward,UserTitle,FavourReceiver} from '../components/styledComponents';
import {connect} from 'react-redux';
import {SubmitProveRequest} from '../Redux/thunks';
import UploadImageButton from './UploadImageButton';
import {Button} from 'antd';

const ProveFavour=  ({favour,onSubmitPressed}) =>{
    const [awardRelation, setAwardRelation] = useState({
        favourID:favour._id,
        debtor:favour.publisher,
        creditor:favour.receiver,
        award:favour.award,
        follower:favour.follower,
        prove:'',
    })
        return(
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
            <br></br>
            <div>Prove:</div>
            <UploadImageButton />
            <img style={{width:'400px'}} src={require("../Images/postImg/healthcare.jpg")} />
            <Button type="primary" onClick={()=>onSubmitPressed(awardRelation)}>Submit</Button>

        </FavourItemContainer>
    )
}
const mapDispatchToProps = dispatch =>({
    onSubmitPressed:awardRelation=>dispatch(SubmitProveRequest(awardRelation)),
});

export default connect(null,mapDispatchToProps)(ProveFavour);