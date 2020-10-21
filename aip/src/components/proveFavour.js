import React,{useState} from 'react';
import {FavourItemContainer,FavourPublisher,FavourTime,FavourAward,UserTitle,FavourReceiver} from '../components/styledComponents';
import {connect} from 'react-redux';
import {SubmitProveRequest} from '../Redux/thunks';

const ProveFavour=  ({favour,onSubmitPressed}) =>{
    const [awardRelation, setAwardRelation] = useState({
        favourID:favour._id,
        debtor:favour.publisher,
        creditor:favour.receiver,
        award:favour.award,
        follower:favour.follower,
        prove:'',
    });
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
                            setAwardRelation({
                                ...awardRelation,
                                prove:imageBase64,
                            })
                        }

                    }
            }
            else{
                setAwardRelation({
                    ...awardRelation,
                    prove:''
                })
            }
    }

    const submitHandler = (input)=>{
        if(input.prove===''){
            alert("You have to upload a picture as a proof!")
        }
        else{
            onSubmitPressed(input);
        }
    }
        return(
            <FavourItemContainer>
            <UserTitle>
                <FavourPublisher>{favour.publisher}</FavourPublisher>  
            </UserTitle>
            <br></br>
            <div>Request:&nbsp;{favour.text}</div>
            <br></br>
            <div>award:&nbsp;<FavourAward>{favour.award}</FavourAward></div>
            <br></br>
            {favour.receiver?<div>Accepted by:&nbsp;<FavourReceiver>{favour.receiver}</FavourReceiver></div>:null}
            <br></br>
            <FavourTime>Posted at:&nbsp;{(new Date(favour.createdAt)).toLocaleString("en-AU")}</FavourTime>
            <br></br>
            <div>Prove:</div>
            <input type='file' id='images' accept='image/*' onChange={e=>loadHandler(e)}/>
            <img src={awardRelation.prove?awardRelation.prove:null} />
            <button onClick={()=>{submitHandler(awardRelation)}}>Submit</button>

        </FavourItemContainer>
    )
}
const mapDispatchToProps = dispatch =>({
    onSubmitPressed:awardRelation=>dispatch(SubmitProveRequest(awardRelation)),
});

export default connect(null,mapDispatchToProps)(ProveFavour);