import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import FavourContent from './favourContent';
import { getFavoursLoading} from '../Redux/selectors';
import {
    LoadFavours,
    RemoveFavoursRequest,
    AcceptFavourRequest,
    AddCommentRequest,
    AddAwardRequest,
} from '../Redux/thunks';

// ----------------------------------------------------------------------------------------------------------------------

const FavourList = ({ page, size, options,
    validFavours,
    invalidFavours,
    isLoading,
    onRemovePressed,
    onAcceptPressed,
    onDisplayAlertClicker,
    startLoadingFavours,
    onAddCommentPressed,
    onAddAwardPressed,
    index }) => {
    useEffect(() => {
        startLoadingFavours(page, size, options);
    }, [startLoadingFavours, page, size]);
    const LoadingMessage = <div>Is loading...</div>
    return isLoading ? LoadingMessage : index === 'home' ?
        <FavourContent
            validFavours={validFavours}
            onRemovePressed={onRemovePressed}
            onAcceptPressed={onAcceptPressed}
            onDisplayAlertClicker={onDisplayAlertClicker}
            onAddAwardPressed={onAddAwardPressed}
            onAddCommentPressed={onAddCommentPressed}
            index={index} />
        : index === 'mypage' ? <FavourContent
            validFavours={validFavours}
            invalidFavours={invalidFavours}
            onRemovePressed={onRemovePressed}
            onAcceptPressed={onAcceptPressed}
            onDisplayAlertClicker={onDisplayAlertClicker}
            onAddAwardPressed={onAddAwardPressed}
            onAddCommentPressed={onAddCommentPressed}
            index={index}
        /> : null
};

const filterValue = (state, isAccepted) => {
    const item = state.favours.data.filter(favour => favour.isAccepted === isAccepted);
    return item;
}
const mapStateToProps = state => ({
    isLoading: getFavoursLoading(state),
    invalidFavours: filterValue(state, true),
    validFavours: filterValue(state, false),
});

const mapDispatchToProps = dispatch => ({
    startLoadingFavours: (page, size, options) => dispatch(LoadFavours(page, size, options)),
    onRemovePressed: favour => dispatch(RemoveFavoursRequest(favour)),
    onAcceptPressed: favour => dispatch(AcceptFavourRequest(favour)),
    onAddCommentPressed: comment => dispatch(AddCommentRequest(comment)),
    onAddAwardPressed: award => dispatch(AddAwardRequest(award))
})



export default connect(mapStateToProps, mapDispatchToProps)(FavourList);