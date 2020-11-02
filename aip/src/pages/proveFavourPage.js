import React from 'react';
import ProveFavour from '../components/proveFavour';
// ----------------------------------------------------------------------------------------------------------------------

const ProveFavourPage = (props) => {
    let favour = props.location.state;
    return <ProveFavour favour={favour} />

}
export default ProveFavourPage;