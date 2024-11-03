import classNames from 'classnames/bind';
import styles from './FormAlbum.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Input from '../Input';
import Button from '../Button';
import * as AlbumService from '../../services/albumService'
import { useState } from 'react';
const cx = classNames.bind(styles);
function FormAlbum({ handleUnmount }) {
    const [albumName, setAlbumName] = useState('');
    const [description, setDescription] = useState('');

    const handleOnclickAdd = (e) => {
        const create = async () => {
            const uniqueId = uuidv4();
            try {
                const res = await AlbumService.createAlbum({
                    albumName: albumName,
                    description: description,
                    location: uniqueId,
                });
                alert(res.data);
                window.location.reload();
            } catch (error) {
                console.error('Error creating album:', error);
            }
        }
        create();

    }
    const handleOnchange = (e) => {
        const { name, value } = e.target;
        if (name === 'albumName') {
            setAlbumName(value);
        }
        else {
            setDescription(value);
        }
    }

    return (<div className={cx('wrapper')}>
        <div className={cx('form')}>
            <h2>ADD NEW ALBUM</h2>
            <Input className={cx("album-control")}
                type="text"
                id="albumName"
                name="albumName"
                placeholder="Album Name"
                autoComplete="albumName"
                value={albumName}
                onChange={handleOnchange}
            />
            <textarea className={cx('txt-area')}
                placeholder="Description"
                name="description"
                value={description}
                onChange={handleOnchange}>
            </textarea>
            <div>
                <Button first onClick={handleUnmount}>Cancel</Button>
                <Button first onClick={handleOnclickAdd}>Add</Button>
            </div>
        </div>
    </div>);
}

export default FormAlbum;