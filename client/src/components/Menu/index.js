import classNames from "classnames/bind";
import styles from './Menu.module.scss';
import Button from "../Button";
import * as AlbumService from '../../services/albumService';

const cx = classNames.bind(styles);

function Menu({ ImageObj, MenuItems, test, setTest }) {

    const current = test.length > 0 ? test : MenuItems;

    const handleAddImgToAlbum = (e, AlbumObj, ImageObj) => {
        e.stopPropagation();
        const addImgToAblum = async () => {
            const data = {
                albumId: AlbumObj.id,
                imageId: ImageObj.id,
            }
            try {
                const res = await AlbumService.addImgToAlbum(data);
                alert(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        addImgToAblum();
    }

    return (
        <div className={cx('wrapper')}>
            {test.length > 0 && (
                <Button four icon={<i className="fa-solid fa-arrow-left"></i>} className={cx('modifier')} onClick={(e) => {
                    e.stopPropagation();
                    setTest([]);
                }}>
                    Back
                </Button>
            )}
            {/* If have id => item = ablumObj, If dont have id => item = MenuItems*/}
            {current.map((item, index) => (
                item.id ? (
                    <Button key={index} four onClick={(e) => handleAddImgToAlbum(e, item, ImageObj)}>
                        {item.albumName}

                    </Button>
                ) : (
                    <Button key={index} four onClick={(e) => item.handleOnclick(ImageObj, e)}>
                        {item.name}
                    </Button>
                )
            ))}

        </div>
    );
}

export default Menu;
