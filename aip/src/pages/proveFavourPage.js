import React from 'react';
import {FavourItemContainer,FavourPublisher,FavourTime,FavourAward,UserTitle,FavourReceiver} from '../components/styledComponents';

const ProveFavourPage = (props)=>{
    let favour = props.location.state;
    const fileChange=()=>{
    }
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
            <input type='file' id='images' accept='image/*' onChange={fileChange()}/>
            <button>Submit</button>

        </FavourItemContainer>
    )
}
export default ProveFavourPage;