import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './AlbumDetail.module.scss';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Menu from '../../components/Menu';
import Button from '../../components/Button';
import FormConfirm from '../../components/FormConfirm';
import * as AlbumService from '../../services/albumService';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function AlbumDetail() {
    const { id } = useParams();
    const [activeIndex, setActiveIndex] = useState(null);
    const [img, setImg] = useState([]);
    const [albumOnlick, setAlbumOnlick] = useState([]);
    const [album, setAlbum] = useState(null);
    const [fixAlbum, setFixAlbum] = useState(false);
    const [albumName, setAlbumName] = useState("");
    const [description, setDescription] = useState("");
    const [showFormConfirm, setShowFormConfirm] = useState(false);
    const menuRef = useRef(null);
    const [isImageClicked, setIsImageClicked] = useState(false);  // State to track image click
    const [selectedImage, setSelectedImage] = useState(null);
    const imgRefs = useRef([]);
    const [isDeleting, setIsDeleting] = useState(false);
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

    const handleDownloadImg = async (ImageObj, e) => {
        if (isDeleting) return;
        e.stopPropagation();
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

    const handleDeleteImg = (ImageObj, e) => {
        if (isDeleting) return;
        e.stopPropagation();
        setIsDeleting(true);
        document.removeEventListener('mousedown', handleClickOutside);
        const idAlbumImg = ImageObj.id;
        const deleteImgFromAlbum = async () => {
            try {
                const res = await AlbumService.deleteImgFromAlbum(idAlbumImg);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    onClose: () => {
                        setImg((prev) => prev.filter((img) => img.id !== idAlbumImg));
                        setActiveIndex(null);
                        setIsDeleting(false);
                    },
                });
            } catch (error) {
                console.log(error);
                toast.error(`Error:${error.respone.data.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
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
                await AlbumService.deleteAlbum(id);
                window.location.href = "/album"
            } catch (error) {
                console.log(error);
            }
        }
        deleteAlbum();
    }

    const MenuItems = [
        {
            name: 'Download',
            icon: 'fa-solid fa-download',
            handleOnclick: handleDownloadImg
        },
        {
            name: 'Delete',
            icon: 'fa-solid fa-trash',
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
                    await AlbumService.updateAlbum(id, data);
                    window.location.reload();
                } catch (error) {
                    formik.setFieldError('albumName', error.response.data.message);
                    console.log(error);
                }
            }
            updateAlbum();
        },
    });
    const handleCloseImage = () => {
        setIsImageClicked(false);
        setSelectedImage(null);
    };
    const handleGetImage = (e, index) => {
        if (isDeleting) return;
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
                    <div className={cx('icon')} onClick={() => {
                        if (isDeleting) return;
                        setFixAlbum(true)
                    }}>
                        <i className="fa-solid fa-pen" ></i>
                    </div>
                    <div className={cx('icon1')} onClick={() => {
                        if (isDeleting) return;
                        setShowFormConfirm(true)
                    }}>
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
                                    <Menu ImageObj={obj} setImg={setImg} MenuItems={MenuItems} albumOnlick={albumOnlick} setAlbumOnlick={setAlbumOnlick} />
                                )}
                            </i>
                        </div>
                    </div>
                ))}
            </div>


            {showFormConfirm && (
                <FormConfirm title={"Confirm"} content={"Do you want to delete this album?"}>
                    <div className={cx('modal-buttons')}>
                        <Button first onClick={() => setShowFormConfirm(false)} className={cx('btn-cancel')}>Cancel</Button>
                        <Button first onClick={(e) => handleDeleteAlbum(e)} className={cx('btn-delete')}>Delete</Button>
                    </div>
                </FormConfirm>
            )
            }
            <ToastContainer />

        </div >
    );
}

export default AlbumDetail;
