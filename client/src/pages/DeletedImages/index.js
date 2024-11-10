import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './DeletedImages.module.scss';
import Button from '../../components/Button';
import axios from 'axios';
import * as deletedImgService from '../../services/deletedImgService';
import Menu from '../../components/Menu';
const cx = classNames.bind(styles);

function DeletedImages() {
    const [deletedImg, setDeleteImg] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [test, setTest] = useState([]);
    const menuRef = useRef(null);

    //
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
        setActiveIndex(activeIndex === index ? null : index);
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setActiveIndex(null);
        }
    };
    const handleRestore = (objDeletedImage, e) => {
        const id = objDeletedImage.id;
        const restoreImg = async () => {
            try {
                const res = await deletedImgService.restoreDeletedImage(id);
                window.alert(res.message);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
        restoreImg();
    }
    const handleDeleteImg = (objDeletedImage, e) => {
        const id = objDeletedImage.id;
        const removeImg = async () => {
            try {
                const res = await deletedImgService.removeDeletedImage(id);
                alert(res.message);
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
        removeImg();
    }
    const MenuItems = [
        {
            name: 'Restore',
            handleOnclick: handleRestore
        },
        {
            name: 'Delete',
            handleOnclick: handleDeleteImg
        }
    ];
    return (
        <div className={cx('demo')}>
            {deletedImg.map((obj, index) => (
                <div key={index} className={cx('wrapper')}>
                    <img
                        src={obj.url}
                        className={cx('img')}
                        alt="img"
                    />
                    <div className={cx('hope')} ref={activeIndex === index ? menuRef : null}>
                        <i className={`fa-solid fa-bars ${cx('test')}`} onClick={() => handleOnclick(index)}>
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

export default DeletedImages;