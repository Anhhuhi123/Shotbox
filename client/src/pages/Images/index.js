import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind'
import styles from './Images.module.scss'
import * as ImageService from '../../services/imageService'
const cx = classNames.bind(styles)
function Images() {
    const [img, setImg] = useState([]);
    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await ImageService.showAllImages();
                setImg(res.data);
            } catch (error) {
                console.error(error);
            }
        }
        getImages();
    }, []);

    return (
        <div>
            {/* Images */}
            {img.map((obj, index) => {
                return (
                    <img
                        key={index}
                        src={obj.filePath}
                        className={cx('img')}
                        alt="img"
                    />
                );
            })}
        </div>
    );
}

export default Images;
