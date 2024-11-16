import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { showUpload } from '../../redux/actions/upload';
import { authLogout } from '../../redux/actions/auth';
import Button from '../Button';
import * as userService from '../../services/userService.js';

const cx = classnames.bind(styles);

function NavBar({ mainLayout, defaultLayout, href, children }) {
    const [showMenuItems, setShowMenuItems] = useState(false);
    const menuRef = useRef(null); // Ref to track the menu element
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await userService.getUser();
                setUser({
                    name: res.name,
                    email: res.email,
                });
            } catch (error) {
                console.log(error);
            }
        };
        if (localStorage.getItem('authToken')) {
            fetchApi();
        }
    }, []);

    const handleOnclick = (e) => {
        const action = showUpload(true);
        dispatch(action);
    };

    const handleOnlickLogout = (e) => {
        dispatch(authLogout());
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenuItems(false);
            }
        };
        if (showMenuItems) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenuItems]);


    return (
        <div className={cx('wrapper')}>
            <Link className={cx('logo')} to="../home"></Link>
            {children}

            {mainLayout && (
                <div className={cx('actions')}>
                    <Button first to='/login'>Log In</Button>
                </div>
            )}

            {defaultLayout && (
                <div className={cx('fix-toolbar')}>
                    <div className={cx('actions')}>
                        <Button second onClick={handleOnclick}>UPLOAD</Button>
                    </div>

                    <div className={cx('actions')}>
                        <Button icon={<i className="fa-regular fa-user"></i>} className={cx('demo111')}></Button>
                    </div>

                    <div className={cx('actions')}>
                        <Button to='/user' className={cx('demo111')}>{user ? user.name : ""}</Button>
                    </div>

                    <div className={cx('option')} ref={menuRef} onClick={() => setShowMenuItems(!showMenuItems)}>
                        <i className="fa-solid fa-ellipsis-vertical" ></i>
                        {showMenuItems && (
                            <div className={cx('menu-items')}>
                                <Button to='/user' four icon={<i className={`fa-solid fa-gear ${cx('icon-modifier')}`}></i>}>Settings</Button>
                                <Button to='/deleted/images' four icon={<i className={`fa-solid fa-trash ${cx('icon-modifier')}`}></i>}>Recycle Bin</Button>
                                <Button four onClick={handleOnlickLogout} icon={<i className={`fa-solid fa-right-from-bracket ${cx('icon-modifier')}`}></i>}>Logout</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NavBar;
