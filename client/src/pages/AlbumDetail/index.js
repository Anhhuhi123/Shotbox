import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './AlbumDetail.module.scss';
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
    const menuRef = useRef(null);
    const [album, setAlbum] = useState(null);
    const [fixAlbum, setFixAlbum] = useState(false);
    const [albumName, setAlbumName] = useState("");
    const [description, setDescription] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    useEffect(() => {
        const showAlbumDetail = async () => {
            try {
                const res = await AlbumService.showAlbumDetail(id);
                // console.log(res.data);
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

    const handleSave = async () => {
        const updateAlbum = async () => {
            const id = album.id;
            const data = {
                albumName: albumName,
                description: description
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
    };

    const handleCancel = () => {
        setFixAlbum(false);
        setAlbumName(album.albumName);
        setDescription(album.description);
    };

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

    return (
        <div className={cx('demoo')}>
            {album && (
                <div className={cx('header')}>
                    <div className={cx('aaa')}>
                        {fixAlbum ? (
                            <div className={cx('test1')}>
                                <input
                                    className={cx("album-control")}
                                    type="text"
                                    id="albumName"
                                    name="albumName"
                                    placeholder="Album Name"
                                    value={albumName}
                                    onChange={(e) => setAlbumName(e.target.value)}
                                />
                                <textarea
                                    className={cx('txt-area')}
                                    placeholder="Description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div>
                                    <Button first onClick={handleCancel}>Cancel</Button>
                                    <Button first onClick={handleSave}>Save</Button>
                                </div>
                            </div>
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

            <div className={cx('demo')}>
                {img.map((obj, index) => (
                    <div key={index} className={cx('wrapper')}>
                        <img src={obj.url} className={cx('img')} alt="img" />
                        <div className={cx('hope')} ref={activeIndex === index ? menuRef : null}>
                            <i className={`fa-solid fa-bars ${cx('test')}`} onClick={() => handleOnclick(index)}>
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
                            <button onClick={(e) => { console.log('aaas') }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AlbumDetail;
