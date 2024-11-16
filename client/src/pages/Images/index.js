import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Images.module.scss';
import * as ImageService from '../../services/imageService';
import Button from '../../components/Button';
import axios from 'axios';
import Menu from '../../components/Menu';
import * as AlbumService from '../../services/albumService';

const cx = classNames.bind(styles);

function Images() {
    const [img, setImg] = useState([]);
    const [album, setAlbum] = useState([]);
    const [test, setTest] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isImageClicked, setIsImageClicked] = useState(false);  // State to track image click
    const [selectedImage, setSelectedImage] = useState(null);
    const menuRef = useRef(null);
    const imgRefs = useRef([]);
    // show images from user
    useEffect(() => {
        const getImages = async () => {
            try {
                const res = await ImageService.showAllImages();
                setImg(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getImages();
    }, []);
    // show albums from user
    useEffect(() => {
        const showAlbum = async () => {
            try {
                const res = await AlbumService.showAllAlbums();
                setAlbum(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        showAlbum();
    }, []);
    // handle when we mousedown
    useEffect(() => {
        if (activeIndex !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeIndex]);

    const handleOnclick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActiveIndex(null);
        }
    };

    // handle MenuItems
    const demo = async (ImageObj) => {
        const url = ImageObj.url;
        try {
            const response = await axios.head(url);
            const fileSizeInBytes = response.headers['content-length'];
            const fileSizeInKB = fileSizeInBytes / 1024;
            console.log(`Dung lượng ảnh: ${fileSizeInKB.toFixed(2)} KB`);
        } catch (error) {
            console.error("Không thể lấy dung lượng ảnh:", error);
        }
    };

    const handleDownloadImg = async (ImageObj) => {
        const url = ImageObj.url;
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'demo.jpg';
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };

    const handleDeleteImg = async (ImageObj) => {
        const idImg = ImageObj.id;
        try {
            const res = await ImageService.deleteImage(idImg);
            alert(res.message);
            setImg((prev) => prev.filter((img) => img.id !== idImg));
        } catch (error) {
            console.error(error);
        }
    };

    const handleShowAlbumName = async (ImageObj, e) => {

        e.stopPropagation();
        const newItems = album.map(item => ({
            id: item.id,
            userId: item.userId,
            albumName: item.albumName,
            description: item.description,
            location: item.location,
            createdAt: item.createdAt,
        }));
        setTest(prev => [...prev, ...newItems]);
    };

    const MenuItems = [
        {
            name: 'Get Size',
            handleOnclick: demo
        },
        {
            name: 'Add To Album',
            handleOnclick: handleShowAlbumName
        },
        {
            name: 'Download',
            handleOnclick: handleDownloadImg
        },
        {
            name: 'Delete',
            handleOnclick: handleDeleteImg
        }
    ];
    const handleGetImage = (e, index) => {
        const imgElement = imgRefs.current[index];
        if (imgElement) {
            setSelectedImage(imgElement.src);  // Save selected image URL
            setIsImageClicked(true);  // Mark image as clicked
        }
    };

    const handleCloseImage = () => {
        setIsImageClicked(false);
        setSelectedImage(null);
    };

    return (
        <div className={cx('wrapper')}>
            {isImageClicked && selectedImage && (
                <div className={cx('image-overlay')} onClick={handleCloseImage}>
                    <img src={selectedImage} alt="Selected" className={cx('full-screen-img')} />
                </div>
            )}

            {img.map((obj, index) => (
                <div key={index} className={cx('card')}>
                    <img
                        ref={(el) => (imgRefs.current[index] = el)}
                        src={obj.url}
                        className={cx('img')}
                        alt="img"
                        onClick={(e) => handleGetImage(e, index)}
                    />
                    <div className={cx('block-option')} ref={activeIndex === index ? menuRef : null}>
                        <i className={`fa-solid fa-bars ${cx('icon-modifier')}`} onClick={() => handleOnclick(index)}>
                            {activeIndex === index && (

                                <Menu ImageObj={obj} MenuItems={MenuItems} test={test} setTest={setTest} />

                            )}
                        </i>
                    </div>
                </div>
            ))}


        </div>
    );
}

export default Images;
