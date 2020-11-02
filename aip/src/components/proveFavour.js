import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SubmitProveRequest } from '../Redux/thunks';
import loadImageHandler from './loadImageHandler';
import {
    FavourItemContainer,
    FavourPublisher,
    FavourTime,
    FavourAward,
    UserTitle,
    FavourReceiver,
} from '../components/styledComponents';
// ----------------------------------------------------------------------------------------------------------------------

const ProveFavour = ({ favour, onSubmitPressed }) => {
    // -----state for creating new award relation-------------------
    const [awardRelation, setAwardRelation] = useState({
        favourID: favour._id,
        debtor: favour.publisher,
        creditor: favour.receiver,
        award: favour.award,
        follower: favour.follower,
        prove: '',
    });
    // ---------submit handler to check the input and connect to thunk----------------
    const submitHandler = (input) => {
        if (input.prove === '') {
            alert("You have to upload a picture as a proof!")
        }
        else {
            onSubmitPressed(input);
        }
    }
    return (
        <FavourItemContainer>
            <UserTitle>
                <FavourPublisher>{favour.publisher}</FavourPublisher>
            </UserTitle>
            <br></br>
            <div>Request:&nbsp;{favour.text}</div>
            <br></br>
            <div>award:&nbsp;<FavourAward>{favour.award}</FavourAward></div>
            <br></br>
            {favour.receiver ? <div>Accepted by:&nbsp;<FavourReceiver>{favour.receiver}</FavourReceiver></div> : null}
            <br></br>
            <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
            <br></br>
            <div>Prove:</div>
            <input type='file' id='images' accept='image/*' onChange={e => loadImageHandler(e, awardRelation, setAwardRelation, 1)} />
            {awardRelation.prove ? <img src={awardRelation.prove} alt={'img'} style={{ width: '200px', height: '200px', objectFit: "contain" }} /> : null}
            <button onClick={() => { submitHandler(awardRelation) }}>Submit</button>

        </FavourItemContainer>
    )
}
const mapDispatchToProps = dispatch => ({
    onSubmitPressed: awardRelation => dispatch(SubmitProveRequest(awardRelation)),
});

export default connect(null, mapDispatchToProps)(ProveFavour);