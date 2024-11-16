import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AlbumDetail.module.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Menu from '../../components/Menu';
import Button from '../../components/Button';
import * as AlbumService from '../../services/albumService';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function AlbumDetail() {
    const { id } = useParams();
    const [activeIndex, setActiveIndex] = useState(null);
    const [img, setImg] = useState([]);
    const [test, setTest] = useState([]);
    const [album, setAlbum] = useState(null);
    const [fixAlbum, setFixAlbum] = useState(false);
    const [albumName, setAlbumName] = useState("");
    const [description, setDescription] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const menuRef = useRef(null);

    const [isImageClicked, setIsImageClicked] = useState(false);  // State to track image click
    const [selectedImage, setSelectedImage] = useState(null);
    const imgRefs = useRef([]);
    useEffect(() => {
        const showAlbumDetail = async () => {
            try {
                const res = await AlbumService.showAlbumDetail(id);
                setAlbum(res.data);
                setAlbumName(res.data.albumName);
                setDescription(res.data.description);
            } catch (error) {
                console.log(error);
            }
        }
        showAlbumDetail();
    }, [id]);

    useEffect(() => {
        const getImgFromAlbum = async () => {
            try {
                const res = await AlbumService.showImgFromAlbum(id);
                setImg(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getImgFromAlbum();
    }, [id]);

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

    const handleDownloadImg = async (ImageObj) => {
        const url = ImageObj.url;
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'image.jpg';
            link.click();
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }

    const handleDeleteImg = (ImageObj) => {
        const idAlbumImg = ImageObj.id;
        const deleteImgFromAlbum = async () => {
            try {
                const res = await AlbumService.deleteImgFromAlbum(idAlbumImg);
                alert(res.message);
                setImg((prev) => prev.filter((img) => img.id !== idAlbumImg));
            } catch (error) {
                console.log(error);
            }
        }
        deleteImgFromAlbum();
    }

    const handleCancel = () => {
        setFixAlbum(false);
        setAlbumName(album.albumName);
        setDescription(album.description);
        formik.setValues({
            albumName: album.albumName,
            description: album.description,
        });
    };
    const handleDeleteAlbum = (e) => {
        const deleteAlbum = async () => {
            const id = album.id;
            try {
                const res = await AlbumService.deleteAlbum(id);
            } catch (error) {
                console.log(error);
            }
        }
        deleteAlbum();
        window.location.href = "/album"
    }

    const MenuItems = [
        {
            name: 'Download',
            handleOnclick: handleDownloadImg
        },
        {
            name: 'Delete',
            handleOnclick: handleDeleteImg
        }
    ];

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            albumName: albumName || '',
            description: description || '',
        },
        validationSchema: Yup.object({
            albumName: Yup.string()
                .required('Album name is required')
                .min(3, 'Album name must be at least 3 characters'),
            description: Yup.string()
                .max(500, 'Description cannot exceed 500 characters'),
        }),
        onSubmit: async (values) => {
            const updateAlbum = async () => {
                const id = album.id;
                const data = {
                    albumName: values.albumName,
                    description: values.description
                }
                try {
                    const res = await AlbumService.updateAlbum(id, data);
                    alert(res.message);
                } catch (error) {
                    console.log(error);
                }
            }
            updateAlbum();
            window.location.reload();
        },
    });
    const handleCloseImage = () => {
        setIsImageClicked(false);
        setSelectedImage(null);
    };
    const handleGetImage = (e, index) => {
        const imgElement = imgRefs.current[index];
        if (imgElement) {
            setSelectedImage(imgElement.src);  // Save selected image URL
            setIsImageClicked(true);  // Mark image as clicked
        }
    };
    return (
        <div className={cx('wrapper')}>
            {album && (
                <div className={cx('session1')}>
                    <div className={cx('header')}>
                        {fixAlbum ? (
                            <form className={cx('form')} onSubmit={formik.handleSubmit}>
                                <input
                                    className={cx("album-control")}
                                    type="text"
                                    id="albumName"
                                    name="albumName"
                                    placeholder="Album Name"
                                    value={formik.values.albumName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.albumName && formik.errors.albumName && (
                                    <p className={cx('message-error')}>{formik.errors.albumName}</p>
                                )}
                                <textarea
                                    className={cx('txt-area')}
                                    placeholder="Description"
                                    name="description"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <p className={cx('message-error')}>{formik.errors.description}</p>
                                )}
                                <div className={cx('btn')}>
                                    <Button first onClick={handleCancel} className={cx('btn-modifier')} type="button">Cancel</Button>
                                    <Button first className={cx('btn-modifier')} type="submit">Save</Button>

                                </div>
                            </form>
                        ) : (
                            <>
                                <h2 className={cx('heading')}>{album.albumName}</h2>
                                <span>{album.description}</span>
                                <span> Created {album.createdAt}</span>
                            </>
                        )}
                    </div>
                    <div className={cx('icon')} onClick={() => setFixAlbum(true)}>
                        <i className="fa-solid fa-pen" ></i>
                    </div>
                    <div className={cx('icon1')} onClick={() => setShowDeleteConfirm(true)}>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            )}

            <div className={cx('session2')}>
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
                                    <Menu ImageObj={obj} setImg={setImg} MenuItems={MenuItems} test={test} setTest={setTest} />
                                )}
                            </i>
                        </div>
                    </div>
                ))}
            </div>


            {showDeleteConfirm && (
                <div className={cx('modal')}>
                    <div className={cx('modal-content')}>
                        <h3>Confirm</h3>
                        <p>Do you want to delete this album?</p>
                        <div className={cx('modal-buttons')}>
                            <button onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                            <button onClick={(e) => handleDeleteAlbum(e)}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AlbumDetail;
