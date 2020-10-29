import React,{useState}from 'react';
import {SearchFrame,SearchInput,SearchButton} from './styledComponents';
import {SearchFavoursRequest,LoadFavours} from '../Redux/thunks';
import {connect} from 'react-redux';
// ----------------------------------------------------------------------------------------------------------------------

const SearchFavour = ({onSearchPressed,onClearPressed})=>{
    const[SearchValue, SetSearchValue]=useState('');
    const SubmitSearch=input=>{
        if(input==="Coke"||input==="Coffee"||input==="Biscuit"||input==="Chocolate Bar"){
            onSearchPressed(input)
        }
        else{
            alert('Please choose an award from "Coke","Coffee","Biscuit",and"Chocolate Bar"')
        }
    }
    const ClearSearch=()=>{
        SetSearchValue('');
        onClearPressed();
    }
    return(
    <div>
        <SearchFrame>
        <SearchInput type='text' placeholder='Search Award' value={SearchValue} onChange={e=>{SetSearchValue(e.target.value)}}/>
        <SearchButton  onClick={()=>SubmitSearch(SearchValue)}>Search</SearchButton>
        <SearchButton  onClick={()=>ClearSearch()}>Clear</SearchButton>
        </SearchFrame>
    </div>  
    )       

}   

const mapDispatchToProps = dispatch =>({
    onSearchPressed:input=>dispatch(SearchFavoursRequest(input)),
    onClearPressed:()=>dispatch(LoadFavours())
});

export default connect(null,mapDispatchToProps)(SearchFavour);