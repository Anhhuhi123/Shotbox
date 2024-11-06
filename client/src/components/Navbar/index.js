import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames/bind'
import styles from './Navbar.module.scss'
import { showUpload } from '../../redux/actions/upload'
import { authLogout } from '../../redux/actions/auth'
import Upload from '../Upload'
import Button from '../Button'
import { jwtDecode } from "jwt-decode";
const cx = classnames.bind(styles)
function NavBar({ mainLayout, defaultLayout, href, children }) {
    const [showMenuItems, setShowMenuItems] = useState(false)
    const dispatch = useDispatch();
    if (localStorage.getItem('authToken')) {
        var user = jwtDecode(localStorage.getItem('authToken'));
    }
    const handleOnclick = (e) => {
        const action = showUpload(true);
        dispatch(action)
    }
    const handleOnlickLogout = (e) => {
        dispatch(authLogout());
    }

    const props = {
        to: href,
    }

    return <div className={cx('wrapper')}>
        <Link className={cx('logo')} {...props}></Link>

        {children}

        {mainLayout &&
            <div className={cx('actions')} >
                <Button first to='/login'>Log In</Button>
            </div >
        }

        {defaultLayout &&
            <div className={cx('fix-toolbar')}>
                <div className={cx('actions')} >
                    <Button second onClick={handleOnclick}>UPLOAD</Button>

                </div >

                <div className={cx('actions')} >
                    <Button icon={<i className="fa-regular fa-user"></i>}></Button>
                </div >

                <div className={cx('actions')} >
                    <Button to='/user'>{user ? user.username : ""}</Button>
                </div >

                <div className={cx('actions')} >
                    <Button icon={<i className="fa-solid fa-ellipsis-vertical"></i>} onClick={() => setShowMenuItems(!showMenuItems)}>
                        {showMenuItems &&
                            <div className={cx('menu-items')}>
                                <Button to='/user' four>Settings</Button>
                                <Button to='/deleted/images' four>Recycle Bin</Button>
                                <Button four onClick={handleOnlickLogout}>Logout</Button>
                            </div>
                        }
                    </Button>
                </div >

            </div>
        }


    </div >
}

export default NavBar;