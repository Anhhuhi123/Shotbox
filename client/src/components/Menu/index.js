import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Button from "../Button";
import * as AlbumService from '../../services/albumService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);
function Menu({ ImageObj, MenuItems, albumOnlick, setAlbumOnlick }) {

    const current = albumOnlick.length > 0 ? albumOnlick : MenuItems;
    const handleAddImgToAlbum = (e, AlbumObj, ImageObj) => {
        e.stopPropagation();
        const addImgToAblum = async () => {
            const data = {
                albumId: AlbumObj.id,
                imageId: ImageObj.id,
            }
            try {
                const res = await AlbumService.addImgToAlbum(data);
                toast.success(`Success:${res.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
            } catch (error) {
                console.log(error);
                toast.error(`Error:${error.response.data.message}`, {
                    position: "bottom-center",
                    autoClose: 1000,
                });
            }
        }
        addImgToAblum();
    }

    return (
        <div className={cx('wrapper')}>
            {albumOnlick.length > 0 && (
                <Button four icon={<i className="fa-solid fa-arrow-left"></i>} className={cx('modifier')} onClick={(e) => {
                    e.stopPropagation();
                    setAlbumOnlick([]);
                }}>
                    Back
                </Button>
            )}
            {current.map((item, index) => (
                item.id ? (
                    <Button key={index} four onClick={(e) => handleAddImgToAlbum(e, item, ImageObj)}>
                        {item.albumName}

                    </Button>
                ) : (
                    <Button key={index} four icon={<i className={`${item.icon} ${cx('icon-modifier')}`}></i>} onClick={(e) => item.handleOnclick(ImageObj, e)}>
                        {item.name}
                    </Button>
                )
            ))}
            <ToastContainer />

        </div>
    );
}

export default Menu;
