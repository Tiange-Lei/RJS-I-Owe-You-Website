import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { loadLeadBoard } from '../Redux/thunks';


const LeaderBoard = ({loadingLeaders,users}) => {
    useEffect(()=>{
        loadingLeaders();
    },[loadingLeaders]);
    console.log(users);
    const list = (
        <div>
            <ul>
                <div>LeaderBoard</div>
                {users.slice(0,5).map((item,i)=>(
                    <li key={i}>{item.username} : {item.numberOfAward}</li>
                ))}
            </ul>
        </div>
    );
    return list;
}

const mapStateToProps = state => ({
    users:state.leaders.members
})
const mapDispatchToProps = dispatch =>({
    loadingLeaders:()=>dispatch(loadLeadBoard())
})
    

export default connect(mapStateToProps,mapDispatchToProps)(LeaderBoard);

