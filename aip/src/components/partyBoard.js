import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { getParty } from '../Redux/thunks';
import {PBoardContainer,BoardTitle} from '../components/styledComponents';

const PartyBoard = ({getMeeting,people}) => {
  useEffect(()=>{
    getMeeting(localStorage.username);
  },[getMeeting]);
  console.log(localStorage.username);
  console.log(people);
  const partyList = (
    <PBoardContainer>
      <BoardTitle>You Got A Party</BoardTitle>
      <ul>
        {people.map((item,i)=>(
          <li key={i}>{item}</li>
        ))}
      </ul>
    </PBoardContainer>
  )
  return partyList;
  //return (people.includes(localStorage.username)?partyList:null);
}

const mapStateToProps = state => ({
  people:state.party.users
})

const mapDispatchToProps = dispatch => ({
    getMeeting:(username) =>dispatch(getParty(username))
})

export default connect(mapStateToProps,mapDispatchToProps)(PartyBoard);