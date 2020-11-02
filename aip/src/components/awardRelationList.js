import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAwardsLoading, getIOUAwards, getUOIAwards } from '../Redux/selectors';
import { LoadAwards, RemoveAwardRequest } from '../Redux/thunks';
import { ListWrapper } from './styledComponents';
import AwardRelationItem from './awardRelationItem';
// ----------------------------------------------------------------------------------------------------------------------

const AwardRelationList = ({ startLoadingAwards, isLoading, IOUAwards, UOIAwards, onRemovePressed }) => {
    useEffect(() => {
        startLoadingAwards();
    }, [startLoadingAwards]);
    const LoadingMessage = <div>Is loading...</div>
    const content = (
        <ListWrapper>
            <br></br>
            <div>Others own me:</div>
            {UOIAwards.map((award, key) => (
                <div key={key}>
                    <AwardRelationItem key={key} award={award} onRemovePressed={onRemovePressed} />
                </div>
            ))}
            <br></br>
            <div>I owe others:</div>
            {IOUAwards.map((award, key) => (
                <div key={key}>
                    <AwardRelationItem key={key} award={award} onRemovePressed={onRemovePressed} />
                </div>
            ))}

        </ListWrapper>
    )
    return isLoading ? LoadingMessage : content;
}


const mapStateToProps = state => ({
    isLoading: getAwardsLoading(state),
    IOUAwards: getIOUAwards(state),
    UOIAwards: getUOIAwards(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingAwards: () => dispatch(LoadAwards()),
    onRemovePressed: input => dispatch(RemoveAwardRequest(input)),

})
export default connect(mapStateToProps, mapDispatchToProps)(AwardRelationList);