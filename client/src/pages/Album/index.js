import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import Input from '../../components/Input/';
import Button from '../../components/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import FormAlbum from '../../components/FormAlbum';
import * as AlbumService from '../../services/albumService';

const cx = classNames.bind(styles);

function Album() {
    const [showformAlbum, setShowFormAlbum] = useState(false);
    const [listAlbums, setListAlbums] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getAllAlbums = async () => {
            try {
                const res = await AlbumService.showAllAlbums();
                setListAlbums(res.data);
            } catch (error) {
                console.error('Error fetching albums:', error);
            }
        };
        if (!showformAlbum) {
            getAllAlbums();
        }
    }, [showformAlbum]);

    const handleOnclick = (e) => {
        setShowFormAlbum(!showformAlbum);
    };

    const handleOnclickCancel = (e) => {
        setShowFormAlbum(false);
    };
    const handleOnclickDirect = (e, obj) => {
        navigate(`/album/${obj.location}`)
    }
    return (
        <div className={cx('wrapper')}>
            {listAlbums.map((obj) => (
                <div key={obj.id} className={cx('card')} onClick={(e) => { handleOnclickDirect(e, obj) }}>
                    <h3 className={cx('card-title')}>{obj.albumName}</h3>
                    <p className={cx('card-description')}>{obj.description}</p>
                </div>
            ))}
            <i className={`fa-solid fa-plus ${cx('card', 'card-bonus')}`} onClick={handleOnclick}></i>
            {showformAlbum && <FormAlbum handleUnmount={handleOnclickCancel} />}
        </div>
    );
}

export default Album;
