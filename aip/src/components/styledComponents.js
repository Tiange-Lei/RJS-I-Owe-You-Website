import styled from 'styled-components';

export const Container = styled.div`
    background: #2AAEF0;
    height: 60px;
    text-align: center;
`

export const NavUL = styled.ul`
    list-style:none;
    display: inline-block;
`
export const NavItem = styled.li`
    float: left;
    width:100px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    display: inline-block;
    font-size: 20px;
    cursor:pointer;
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
`

export const FavourItemContainer = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
    border-bottom:
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