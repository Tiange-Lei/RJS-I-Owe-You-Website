// a reuseable component to check the format of uploaded image and tranform it into 64Base format
const loadHandler=(e,state,setStateFunction,a)=>{
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
                    if(a===1){
                        setStateFunction({
                            ...state,
                            prove:imageBase64
                        })
                    }
                    if(a===2){
                        setStateFunction({
                            ...state,
                            picture:imageBase64
                        })
                    }
                    if(a===3){
                        setStateFunction(imageBase64)
                    }

                }

            }
    }
    else{
        if(a===1){
            setStateFunction({
                ...state,
                prove:''
            })
        }
        if(a===2){
            setStateFunction({
                ...state,
                picture:''
            })
        }
        if(a===3){
            setStateFunction('')
        }
    }
}
export default loadHandler;