import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { party } from '../Redux/reducer';
import { getParty } from '../Redux/thunks';

const PartyBoard = ({getMeeting,people}) => {
  useEffect(()=>{
    getMeeting(localStorage.username);
  },[getMeeting]);
  console.log(localStorage.username);
  console.log(people);
  const partyList = (
    <div>
      <div>Let Party</div>
      <ul>
        {people.map((item,i)=>(
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
  return (people.includes(localStorage.username)?partyList:null);
}

const mapStateToProps = state => ({
  people:state.party.users
})

const mapDispatchToProps = dispatch => ({
    getMeeting:(username) =>dispatch(getParty(username))
})

export default connect(mapStateToProps,mapDispatchToProps)(PartyBoard);