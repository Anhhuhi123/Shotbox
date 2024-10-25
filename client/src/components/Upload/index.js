import { useState } from 'react';
import axios from 'axios';
import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Button from '../Button';
import * as ImageService from '../../services/imageService';
const cx = classNames.bind(styles);

function UpLoad({ onClick }) {

    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSelectFromDevice = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async (e) => {

        const CLOUD_NAME = 'djfgf1byn';
        const PRESET_NAME = 'demo-upload';
        const FOLDER_NAME = 'Demo';
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();

        formData.append('file', selectedFile); // 'file' là tên trường được yêu cầu bởi Cloudinary
        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME); // Nếu bạn muốn lưu tệp vào thư mục 'Demo'

        try {
            const response = await axios.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log(response.data.secure_url); // Hiển thị thông tin phản hồi từ Cloudinary
            const res = await ImageService.createImage({
                url: response.data.secure_url,
            })
            alert(res.data)
        } catch (error) {
            console.error('Upload failed:', error);
        }
        window.location.reload();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload')}>
                <div className={cx('wrapper-button')}>
                    {/* <Button five>use-url</Button> */}
                    <Button five onClick={handleSelectFromDevice}>Select-From-Device</Button>
                </div>
                <div className={cx('form')}>
                    <div className={cx('frame')}>
                        <input
                            type="text"
                            style={{ width: '340px', fontSize: '14px', lineHeight: '2.0', height: '27px', outline: 'none' }}
                            placeholder='Paste your URL here...'
                            value={selectedFile ? selectedFile.name : ''} // Kiểm tra nếu selectedFile tồn tại
                            readOnly // Ngăn người dùng chỉnh sửa
                        />
                        <Button five onClick={handleUpload}>UpLoad</Button>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <i className={`fa-regular fa-circle-xmark ${cx('circle-xmark')}`} onClick={onClick}></i>
            </div>
        </div>
    );
}

export default UpLoad;
