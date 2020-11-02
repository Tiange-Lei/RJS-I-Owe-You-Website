import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getParty } from '../Redux/thunks';
import { PBoardContainer, BoardTitle } from '../components/styledComponents';
// ----------------------------------------------------------------------------------------------------------------------
// -------display the result of partydetection when there is a loop-------
const PartyBoard = ({getMeeting,people}) => {
  useEffect(()=>{
    if(localStorage.username){
    getMeeting(localStorage.username)
    };
  }, [getMeeting]);
  const unique = people.filter((v, i, a) => a.indexOf(v) === i);
  const partyList = (
    <PBoardContainer>
      <BoardTitle>You Got A Party</BoardTitle>
      <ul>
        {unique.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </PBoardContainer>
  )
  //------display this component when loop is formed----------------
  return (unique.includes(localStorage.username)?partyList:null);
}

const mapStateToProps = state => ({
  people: state.party.users
})

const mapDispatchToProps = dispatch => ({
  getMeeting: (username) => dispatch(getParty(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(PartyBoard);