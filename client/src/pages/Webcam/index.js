import { useState } from 'react';
import styles from './Webcam.module.scss';
import classNames from 'classnames/bind';
import Camera from '../../components/Camera';
import Button from '../../components/Button';
import axios from 'axios';
import * as ImageService from '../../services/imageService';
const cx = classNames.bind(styles);

function Webcam() {
    const [capturedImage, setCapturedImage] = useState(null);
    // console.log(capturedImage)
    const handleAddImages = async () => {
        const CLOUD_NAME = process.env.CLOUD_NAME;
        const PRESET_NAME = process.env.PRESET_NAME;
        const FOLDER_NAME = process.env.FOLDER_NAME;
        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
        const formData = new FormData();
        formData.append('file', capturedImage); // 'file' là tên trường được yêu cầu bởi Cloudinary
        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', FOLDER_NAME);

        try {
            const response = await axios.post(api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data.secure_url); // Hiển thị thông tin phản hồi từ Cloudinary


            // const res = await axios.post('http://localhost:8080/images', {
            //     url: response.data.secure_url,
            // });
            const res = await ImageService.createImage({
                url: response.data.secure_url,
            })
            alert(res.data)
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>My Camera</h2>
            {!capturedImage && <Camera setCapturedImage={setCapturedImage} />}
            {capturedImage && (
                <div className={cx('demo')}>
                    <img src={URL.createObjectURL(capturedImage)} className={cx('demo1')} alt="" />
                </div>
            )}
            {capturedImage && (
                <div className={cx('demo3')}>
                    <Button first onClick={() => setCapturedImage(null)}>
                        Back
                    </Button>
                    <Button first onClick={handleAddImages}>
                        Add To Images
                    </Button>
                    <Button first onClick={() => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(capturedImage);
                        link.download = 'demo.jpg';
                        link.click();
                    }}>
                        Download
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Webcam;
