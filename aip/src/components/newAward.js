import React,{useState} from 'react';
import {AwardFormContainer,AwardSelector,DefaultOption,DebtorContainer,DebtorDiv,CreditorContainer,CreditorDiv,IOUContainer,UOIContainer,SwitchContainer,UserNameInput,ProveContainer} from './styledComponents';
import {connect} from 'react-redux';
import {SubmitAwardRecord} from '../Redux/thunks';

const NewAwardForm=({onSubmitPressed})=>{

    const [awardInfo,setAwardInfo]=useState({
        debtor:'',
        creditor:'',
        award:'',
        prove:''
    })
    const [x,setX]=useState({value:true});
    const SwitchUser=()=>{
        if(x.value){
            setAwardInfo({
                ...awardInfo,
                creditor:''
            })
        }
        if(!x.value){
            setAwardInfo({
                ...awardInfo,
                debtor:''
            })
        }
        setX({value:!x.value});
    }
    const loadHandler=e=>{
        const reader = new FileReader();
        const file=  e.target.files[0];
        if(file){
                reader.readAsDataURL(file);
                reader.onload=function(){
                    const AllowImgFileSize = 1078702;
                    const imageBase64=this.result;
                    if(AllowImgFileSize!==0&&AllowImgFileSize<imageBase64.length){
                        alert("The size of your uploaded image should be less than 2MB")
                        return
                    }
                    else{
                        setAwardInfo({
                            ...awardInfo,
                            prove:imageBase64
                        })
                    }

                }
        }
        else{
            setAwardInfo({
                ...awardInfo,
                prove:''
            })
        }
    }
    const SubmitAward=(input)=>{
        const regex = RegExp('^[A-Za-z0-9_.]+$');
        const {creditor,debtor} =input;
        if(!regex.test(creditor)||!regex.test(debtor)){
            alert("You input contains illegal characters,please try again")
            return false
        }
        if(input.creditor===localStorage.username&&input.prove===''){
            alert("You need to upload a picture as prove before you make yourself a creditor")
            setAwardInfo({
                ...awardInfo,
                debtor:'',
                prove:'',
            })
            return false;
        }
        if(input.debtor===''){
            alert("Please choose a debtor");
            return false;
        }
        if(input.award===''){
            alert("Please choose an award");
            return false;
        }
        onSubmitPressed(awardInfo);
        setAwardInfo({
            debtor:'',
            creditor:'',
            award:'',
            prove:''
        })
    }
return(
    <AwardFormContainer>
        <div>Record an award:</div>
        <SwitchContainer>
            <IOUContainer x={x}>
                <DebtorContainer>
                    <DebtorDiv>Debtor:</DebtorDiv>
                    <DebtorDiv>&nbsp;{localStorage.username}</DebtorDiv>
                </DebtorContainer>
                <CreditorContainer>
                    <CreditorDiv>Creditor:</CreditorDiv>
                    <CreditorDiv>
                    &nbsp;<UserNameInput type='text' value={awardInfo.creditor} onChange={e=>setAwardInfo({
                        ...awardInfo,
                        debtor:localStorage.username,
                        creditor:e.target.value,
                    })}/>
                    </CreditorDiv>
                </CreditorContainer>
            </IOUContainer>
            <UOIContainer x={x}>
                <DebtorContainer>
                    <DebtorDiv>Debtor:</DebtorDiv>
                    <DebtorDiv>
                    &nbsp;<UserNameInput type='text' value={awardInfo.debtor} onChange={e=>setAwardInfo({
                            ...awardInfo,
                            debtor:e.target.value,
                            creditor:localStorage.username,
                        })}/>
                    </DebtorDiv>
                </DebtorContainer>
                <CreditorContainer>
                    <CreditorDiv>Creditor:</CreditorDiv>
                    <CreditorDiv>
                    <DebtorDiv>&nbsp;{localStorage.username}</DebtorDiv>
                    </CreditorDiv>
                </CreditorContainer>
            </UOIContainer>
        </SwitchContainer>
        <br></br>
        <AwardSelector>
            Select award:&nbsp;&nbsp;&nbsp;
            <select value={awardInfo.award} onChange={e=>setAwardInfo({
                ...awardInfo,
                award:e.target.value
            })}>
            <DefaultOption>Choose award below</DefaultOption>
            <option>Coffee</option>
            <option>Chocolate Bar</option>
            <option>Coke</option>
            <option>Biscuit</option>
            </select>
        </AwardSelector>
        <br></br>
        <ProveContainer x={x}>
            <div>Prove:</div>
            <input type='file' id='images'accept='image/*' onChange={e=>loadHandler(e)}/>
            {awardInfo.prove?<img src={awardInfo.prove} style={{width:'200px',height:'200px',objectFit:"contain"}}/>:null}
        </ProveContainer>
        <br></br>
        <div>
            <button onClick={()=>SwitchUser()}>Switch</button>
            <button onClick={()=>SubmitAward(awardInfo)}>Submit</button>
        </div>
    </AwardFormContainer>
)
}
const mapStateToProps = state =>({
});
const mapDispatchToProps = dispatch =>({
    onSubmitPressed: info=>dispatch(SubmitAwardRecord(info))

})

export default connect(mapStateToProps,mapDispatchToProps)(NewAwardForm);
