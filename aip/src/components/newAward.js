import React,{useState} from 'react';
import {connect} from 'react-redux';
import {SubmitAwardRecord} from '../Redux/thunks';
import loadImageHandler from './loadImageHandler';
import AwardSelectorModel from './awardSelector';
import {AwardFormContainer,
    DebtorContainer,
    DebtorDiv,
    CreditorContainer,
    CreditorDiv,
    IOUContainer,
    UOIContainer,
    SwitchContainer,
    UserNameInput,
    ProveContainer,
    ProvePictureContainer,
    SwitchButton,
    SubmitButton,
} from './styledComponents';
// ----------------------------------------------------------------------------------------------------------------------

const NewAwardForm=({onSubmitPressed})=>{
// --------------------state for award information, which will be sent to thunk----------------
    const [awardInfo,setAwardInfo]=useState({
        debtor:'',
        creditor:'',
        award:'',
        prove:''
    })
    const [x,setX]=useState({value:true});
    // ----------------logic for switching the role of debtor and creditor--------------------
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
            <AwardSelectorModel state={awardInfo} setStateFunction={setAwardInfo}/>
        <ProveContainer x={x}>
        <ProvePictureContainer>
            Prove:&nbsp;&nbsp;&nbsp;
            <input type='file' id='images'accept='image/*' onChange={e=>loadImageHandler(e,awardInfo,setAwardInfo,1)}/>
        </ProvePictureContainer>
            {awardInfo.prove?<img src={awardInfo.prove} style={{width:'200px',height:'200px',objectFit:"contain"}} alt={''}/>:null}
        </ProveContainer>
        <div>
            <SwitchButton onClick={()=>SwitchUser()}>Switch</SwitchButton>
            <SubmitButton onClick={()=>SubmitAward(awardInfo)}>Submit</SubmitButton>
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
