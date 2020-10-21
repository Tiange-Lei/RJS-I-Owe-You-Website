// import React, { Component } from 'react';
// import ReacDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import {serverUrl} from './config';

// const [imageUrl, setImageUrl] = useState('')
// cosnt [loading, setLoading] = useState(false)

// function getBase64(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
// }

// function handleChange(info) {
//     if (info.file.status === 'uploading') {
//       setLoading(true)
//       return;
//     }
//     if (info.file.status === 'done') {
//       // Get this url from response in real world.
//       setLoading(false)
//       console.log(info)
//       setImageUrl(info.file.response.info)
//     }
// };


// class UploadImageButton extends Component {

//     render(){
//         const uploadButton = (
//             <div>
//               {loading ? <LoadingOutlined /> : <PlusOutlined />}
//               <div style={{ marginTop: 8 }}>Upload</div>
//             </div>
//           );
//         return (
//             <div>
//                 <Upload 
//                 name = 'file'
//                 action = {serverUrl + "/api/aip-backend/src/upload/file_upload"}
//                 onChange = { (info) => handleChange(info)}
//                 >
//                 {imageUrl ? <img src={serverUrl + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//                 </Upload>               
//             </div>
//         )
//     }
// }

// export default UploadImageButton;