import styled from 'styled-components';
import {showUP,fadeIn} from './keyframes';
import 'antd/dist/antd.css';

export const Container = styled.div`
    background: #34495E;
    height: 60px;
    text-align: center;
`

export const NavUL = styled.ul`
    list-style:none;
`
export const NavItem = styled.li`
    float: left;
    color: white;
    width:100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    cursor:pointer;
    &:hover{
        background-color:purple;
        color: white
    }
`
export const NavLogin = styled.div`
    float: right;
    width:100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    display: inline-block;
    font-size: 20px;
    cursor:pointer;
    background:green;
`
export const NavLogout = styled.div`
    float: right;
    width:100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    display: inline-block;
    font-size: 20px;
    cursor:pointer;
    background:red;
`

export const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
    position: relative;
    max-width: 700px;
    margin: auto;  
    animation: ${showUP} 1.5s backwards, ${fadeIn} .8s;
`
export const NewFavourInput = styled.textarea`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`
export const NewFavourButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #F7A322;
`
export const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;  
    animation: ${showUP} 1.5s backwards, ${fadeIn} .8s;
`

export const FavourItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    max-width: 700px;
    position: relative;
    margin: auto;  
    box-shadow: 0 4px 8px grey;
`
export const ValidFavour = styled.div`
    background: #fff;
    position: relative;
    animation: ${showUP} 1.5s 0.3s backwards, ${fadeIn} .8s;
`
export const InvalidFavour = styled.div`
    background: #fff;
    position: relative;
    animation: ${showUP} 1.5s 0.5s backwards, ${fadeIn} .8s;
`
export const UserAcceptedFavour = styled.div`
    background: #fff;
    position: relative;
    animation: ${showUP} 1.5s 0.7s backwards, ${fadeIn} .8s;
`
export const ButtonContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`

export const AcceptButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    background-color: #22ee22;
    &:hover{
        transform: scale(1.2);
    }
`
export const RemoveButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    background-color: #ee2222;
    &:hover{
        background-color: red;
        transform: scale(1.2);
    }
`
export const CommentButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    background-color: orange;
    &:hover{
        background-color: orange;
        transform: scale(1.2);
    }
`
export const ProveButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    background-color: #22F7E4 ;
    &:hover{
        transform: scale(1.2);
    }
    margin:2px;
    color: black;
`
export const AddAwardButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
    background-color: #138DF2;
    &:hover{
        transform: scale(1.2);
    }
    margin:2px;
`
export const SelectorContainer = styled.div`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 500px;
    outline: none;
    margin: auto;
    text-align: left;
`
export const DefaultOption = styled.option`
    display:none;
`

export const FavourPublisher = styled.div`
    color:blue;
    float:left;
    margin-left: 5px;
`
export const FavourTime = styled.div`
    color:gray
`
export const FavourAward = styled.span`
    color:orange
`
export const UserImage = styled.img`
    float:left;
    width:30px;
    border-radius: 30px;
`
export const UserTitle = styled.div`
    height: 40px;
    text-align: left;
    line-height: 40px;
    display: inline-block;
`
export const FavourReceiver = styled.span`
    color:green
`
export const BarTitle = styled.span`
    color:white
`

export const SideBarContainer = styled.div`
    float: left;
    background: yellow;
    width: 80px;
    text-align: center;
`
export const SideUL = styled.ul`
    list-style:none;
    display: inline-block;
`
export const SideItem = styled.li`
    color: white;
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    font-size: 20px;
    cursor:pointer;
    &:hover{
        background-color:orange;
        color: white
    }
`

export const DebtorContainer = styled.div`
    float: left;
    width: 200px;
`
export const DebtorDiv = styled.div`
    float: left;

`
export const CreditorContainer = styled.div`
    float: right;
    width: 200px;
`
export const CreditorDiv = styled.div`
    float: left;
`
export const IOUContainer = styled.div`
    positon:absolute;
    color: blue;
    width: 400px;
    margin: auto;
    margin-top: 50px;
    visibility: ${props=>(props.x.value?'hidden':'visible')};
`
export const UOIContainer = styled.div`
    position:absolute;
    color: blue;
    width: 400px;
    margin: auto;
    visibility: ${props=>(props.x.value?'visible':'hidden')};
`
export const AwardSelector = styled.div`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    width: 500px;
    outline: none;
    margin: auto;
    margin-top: 10px;
    text-align: center;
`
export const AwardFormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
    position: relative;
    max-width: 700px;
    margin: auto;  
    postion:relative;
    animation: ${showUP} 1.5s backwards, ${fadeIn} .8s;
`
export const SwitchContainer = styled.div`
    position: relative;
    width: 400px;
    margin: auto;
`

export const UserNameInput = styled.input`
    width: 80px;
`
export const ProveContainer = styled.div`
    margin: auto;
    margin-left: 125px;
    width: 500px;
    text-align:center;
    visibility: ${props=>(props.x.value?'visible':'hidden')};
`


export const AwardRelationContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    max-width: 700px;
    position: relative;
    margin: auto;  
    box-shadow: 0 4px 8px grey;
    animation: ${showUP} 1.5s backwards, ${fadeIn} .8s;
`

export const BoardContainer = styled.div`
    background: #fff;
    font-family:Arial;
    font-size:20px;
    margin-top:20px;
    margin-right:20px;
    float:right;
    border-radius: 8px;
    padding:15px;
    width: 200px;
    position: relative; 
    box-shadow: 0 4px 8px grey;
    animation: ${showUP} 1.5s backwards, ${fadeIn} .8s;
`
export const BoardTitle = styled.div`
    font-size:24px;
    font-family:Arial;
    font-style:bold;
    color: #2E86C1;
    text-shadow: 0.2em 0.1em 0.1em #BDC3C7;
    margin-bottom:10px;
`

export const PBoardContainer = styled.div`
    flex-direction:column;
    background: #fff;
    font-family:Arial;
    top:200px;
    right:20px;
    font-size:20px;
    margin-top:20px;
    float:right;
    border-radius: 8px;
    padding:15px;
    width: 200px;
    position: absolut; 
    box-shadow: 0 4px 8px grey;
    animation: ${showUP} 1.5s backwards, ${fadeIn} .8s;
`

export const RightSideBar = styled.div`
    display:flex;
    flex-direction:column;
    float:right;
`
export const SearchFrame = styled.div`
    margin-right:10%;
    margin-top:20px;
    float:right;
`
export const SearchInput = styled.input`
    border-radius:4px;
    border: none;
    font-family:Arial;
`
export const SearchButton = styled.button`
    border-radius:2px;
    padding:3px;
    background:#2980B9;
    color:#FFF;
    font-family:Arial;
    border: none;
    margin: 2px;
`
export const LOGOContainer = styled.div`
    float:left;
    width:100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    margin-right:35%
`
export const LOGO_I = styled.span`
    font-family:Arial;
    font-weight:bold;
    margin:3px;
    font-size: 30px;
    color:white;
`
export const LOGO_O = styled.span`
    font-family:Arial;
    font-weight:bold;
    margin:3px;
    font-size: 30px;
    color:white;
`
export const LOGO_U = styled.span`
    font-family:Arial;
    font-weight:bold;
    margin:3px;
    font-size: 30px;
    color:white;
`
export const Greeting = styled.div`
    float:left;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    color:yellow;
    margin-left: -30%;
`