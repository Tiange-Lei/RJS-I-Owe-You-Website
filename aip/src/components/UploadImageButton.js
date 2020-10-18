// import React, { Component } from 'react';
// import ReacDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import {serverUrl} from './config';

// const props = {
//     name: 'file',
//     action: {serverUrl},
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList);
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`);
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
// };


// class UploadImageButton extends Component {

//     render(){
//         return (
//             <div>
//                 <Upload {...props}>
//                     <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                 </Upload>               
//             </div>
//         )
//     }
// }

// export default UploadImageButton;