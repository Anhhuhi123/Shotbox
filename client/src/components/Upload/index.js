import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Button from '../Button';
import * as ImageService from '../../services/imageService';
const cx = classNames.bind(styles);

function UpLoad({ setShowUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);
    const displayFileNameRef = useRef('');
    useEffect(() => {
        setIsVisible(true);
    }, []);
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files); // Chuyển FileList thành mảng
        if (files.length > 0) {
            setSelectedFile(files); // Lưu danh sách file vào state
            displayFileNameRef.current = files.map(file => file.name).join(', '); // Hiển thị danh sách tên file
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || selectedFile.length === 0) return;
        const CLOUD_NAME = process.env.CLOUD_NAME;
        const PRESET_NAME = process.env.PRESET_NAME;
        const FOLDER_NAME = process.env.FOLDER_NAME;
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        try {
            for (let file of selectedFile) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', PRESET_NAME);
                formData.append('folder', FOLDER_NAME);

                const response = await axios.post(api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    onUploadProgress: (progressEvent) => {
                        const progress = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(progress);
                    },
                });

                await ImageService.createImage({
                    url: response.data.secure_url,
                });
            }
            toast.success('All files uploaded successfully!', {
                position: "bottom-center",
                autoClose: 3000,
            });
            window.location.reload();
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error(`Error: ${error.response?.data?.message || 'Upload failed'}`, {
                position: "bottom-center",
                autoClose: 3000,
            });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('block', { show: isVisible })}>
                <h2 className={cx('title')}>Upload Image</h2>

                <div className={cx('wrapper-button')}>
                    <Button five onClick={() => fileInputRef.current.click()} className={cx('btn')}>
                        Select From Device
                    </Button>
                </div>

                <div className={cx('form')}>
                    <input
                        type="text"
                        className={cx('input')}
                        placeholder="Selected file(s) or paste URL here..."
                        value={displayFileNameRef.current}
                        readOnly
                    />
                    <Button
                        five
                        onClick={handleUpload}
                        className={cx('btn', { disabled: !selectedFile || selectedFile.length === 0 })}
                        disabled={!selectedFile || selectedFile.length === 0}
                    >
                        Upload
                    </Button>
                </div>

                {uploadProgress > 0 && (
                    <div className={cx('progress-bar')}>
                        <div
                            className={cx('progress')}
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple // Thêm thuộc tính multiple để cho phép chọn nhiều file
                />

                <i
                    className={`fa-regular fa-circle-xmark ${cx('icon-modifier')}`}
                    onClick={() => setShowUpload(false)}
                />
            </div>
            <ToastContainer />
        </div>
    );

}

export default UpLoad;