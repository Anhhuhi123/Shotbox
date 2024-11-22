import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Images.module.scss';
import * as ImageService from '../../services/imageService';
import Menu from '../../components/Menu';
import * as AlbumService from '../../services/albumService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);

function Images() {
    const [img, setImg] = useState([]);
    const [album, setAlbum] = useState([]);
    const [albumOnlick, setAlbumOnlick] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isImageClicked, setIsImageClicked] = useState(false);  // State to track image click
    const [selectedImage, setSelectedImage] = useState(null);
    const menuRef = useRef(null);
    const imgRefs = useRef([]);
    const [isDeleting, setIsDeleting] = useState(false);
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
        // console.log(activeIndex)
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
            setAlbumOnlick([]);
        }
    };


    const handleDownloadImg = async (ImageObj) => {
        if (isDeleting) return;
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
    const handleDeleteImg = async (ImageObj, e) => {
        if (isDeleting) return;
        e.stopPropagation();
        setIsDeleting(true);
        document.removeEventListener('mousedown', handleClickOutside);
        const idImg = ImageObj.id;
        const fetchData = async () => {
            try {
                const res = await ImageService.deleteImage(idImg);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    onClose: () => {
                        setImg((prev) => prev.filter((img) => img.id !== idImg));
                        setActiveIndex(null);
                        setIsDeleting(false);
                    },
                });
            } catch (error) {
                console.error(error);
                toast.success(`Error:${error.response.data.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
            }
        }
        fetchData();
    };

    const handleShowAlbumName = async (ImageObj, e) => {
        if (isDeleting) return;
        e.stopPropagation();
        const newItems = album.map(item => ({
            id: item.id,
            userId: item.userId,
            albumName: item.albumName,
            description: item.description,
            location: item.location,
            createdAt: item.createdAt,
        }));
        setAlbumOnlick(prev => [...prev, ...newItems]);
    };

    const MenuItems = [
        {
            icon: 'fa-solid fa-folder',
            name: 'Add To Album',
            handleOnclick: handleShowAlbumName
        },
        {
            icon: 'fa-solid fa-download',
            name: 'Download',
            handleOnclick: handleDownloadImg
        },
        {
            icon: 'fa-solid fa-trash',
            name: 'Delete',
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
        <div className={cx('wrapper')}>
            <ToastContainer />
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

                                <Menu ImageObj={obj} MenuItems={MenuItems} albumOnlick={albumOnlick} setAlbumOnlick={setAlbumOnlick} />

                            )}
                        </i>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Images;