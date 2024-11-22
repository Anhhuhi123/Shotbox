import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './DeletedImages.module.scss';
import * as deletedImgService from '../../services/deletedImgService';
import Menu from '../../components/Menu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);

function DeletedImages() {
    const [deletedImg, setDeleteImg] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [albumOnlick, setAlbumOnlick] = useState([]);
    const menuRef = useRef(null);
    const [isImageClicked, setIsImageClicked] = useState(false);  // State to track image click
    const [selectedImage, setSelectedImage] = useState(null);
    const imgRefs = useRef([]);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const getDeletedImg = async () => {
            try {
                const res = await deletedImgService.showDeletedImages();
                setDeleteImg(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        getDeletedImg();
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
        if (isDeleting) return;
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActiveIndex(null);
        }
    };
    const handleRestore = (objDeletedImage, e) => {
        if (isDeleting) return;
        e.stopPropagation();
        setIsDeleting(true);
        document.removeEventListener('mousedown', handleClickOutside);
        const id = objDeletedImage.id;
        const restoreImg = async () => {
            try {
                const res = await deletedImgService.restoreDeletedImage(id);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 500,
                    onClose: () => {

                        window.location.reload();
                    },
                });
            } catch (error) {
                console.log(error);
                toast.success(`Error:${error.respone.data.message}`, {
                    position: "bottom-center",
                    autoClose: 500,
                });
            }
        }
        restoreImg();
    }
    const handleDeleteImg = (objDeletedImage, e) => {
        if (isDeleting) return;
        e.stopPropagation();
        setIsDeleting(true);
        document.removeEventListener('mousedown', handleClickOutside);
        const id = objDeletedImage.id;
        const removeImg = async () => {
            try {
                const res = await deletedImgService.removeDeletedImage(id);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 500,
                    onClose: () => {
                        window.location.reload();
                    },
                });
            } catch (error) {
                console.log(error)
            }
        }
        removeImg();
    }
    const MenuItems = [
        {
            name: 'Restore',
            icon: 'fa-solid fa-arrows-rotate',
            handleOnclick: handleRestore
        },
        {
            name: 'Delete',
            icon: 'fa-solid fa-trash',
            handleOnclick: handleDeleteImg
        }
    ];
    const handleGetImage = (e, index) => {
        if (isDeleting) return;
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
        <div className={cx('demo')}>
            {isImageClicked && selectedImage && (
                <div className={cx('image-overlay')} onClick={handleCloseImage}>
                    <img src={selectedImage} alt="Selected" className={cx('full-screen-img')} />
                </div>
            )}
            {deletedImg.map((obj, index) => (
                <div key={index} className={cx('wrapper')}>
                    <img
                        ref={(el) => (imgRefs.current[index] = el)}
                        src={obj.url}
                        className={cx('img')}
                        alt="img"
                        onClick={(e) => handleGetImage(e, index)}
                    />
                    <div className={cx('hope')} ref={activeIndex === index ? menuRef : null}>
                        <i className={`fa-solid fa-bars ${cx('icon-modifier')}`} onClick={() => handleOnclick(index)}>
                            {activeIndex === index && (

                                <Menu ImageObj={obj} MenuItems={MenuItems} albumOnlick={albumOnlick} setAlbumOnlick={setAlbumOnlick} />

                            )}
                        </i>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default DeletedImages;