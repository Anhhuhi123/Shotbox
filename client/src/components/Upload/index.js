import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Upload.module.scss';
import Button from '../Button';
import * as ImageService from '../../services/imageService';
import { hideUpload } from '../../redux/actions/upload';

const cx = classNames.bind(styles);

function UpLoad() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isVisible, setIsVisible] = useState(false); // Thêm state để kiểm soát sự xuất hiện của phần tử
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    const handleSelectFromDevice = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        const CLOUD_NAME = 'dt3gvugaf';
        const PRESET_NAME = 'demo-upload';
        const FOLDER_NAME = 'Demo';
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME);

        try {
            const response = await axios.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const res = await ImageService.createImage({
                url: response.data.secure_url,
            });
            toast.success(`Success:${res.message}`, {
                position: "bottom-center",
                autoClose: 1000,
                onClose: () => {
                    window.location.reload();
                },
            });
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error(`Error:${error.response.data.message}`, {
                position: "bottom-center",
                autoClose: 1000,
            });
        }
    };

    const handleClickIcon = () => {
        dispatch(hideUpload(false));
    };

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload', { show: isVisible })}>
                <div className={cx('wrapper-button')}>
                    <Button five onClick={handleSelectFromDevice} className={cx('btn')}>
                        Select-From-Device
                    </Button>
                </div>
                <div className={cx('form')}>
                    <div className={cx('frame')}>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="Paste your URL here..."
                            value={selectedFile ? selectedFile.name : ''}
                            readOnly
                        />
                        <Button five onClick={handleUpload} className={cx('btn', { disabled: !selectedFile })} disabled={!selectedFile}   >
                            UpLoad
                        </Button>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <i
                    className={`fa-regular fa-circle-xmark ${cx('circle-xmark')}`}
                    onClick={handleClickIcon}
                ></i>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UpLoad;
