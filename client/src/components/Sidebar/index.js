import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'
import Button from '../Button'
import { useSelector } from "react-redux";
import { useState } from 'react';
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)
function Sidebar() {
    const roleId = useSelector((state) => state.auth.roleId);
    // const ListManager = ['User', 'Capacity', 'Upgrade'];
    const ListManager = [
        {
            name: 'User',
            href: '/manager/user',
        },
        {
            name: 'Capacity',
            href: '/manager/capacity',
        },
        {
            name: 'Upgrade',
            href: '/manager/upgrade',
        },
    ];
    const [showListManager, setShowListManager] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnclick = (e) => {
        setShowListManager(!showListManager);
    }
    const handleClick = (index) => {
        setActiveIndex(index);
    };
    return <div className={cx('wrapper')}>
        <Button third to='/home' icon={<i className={`fa-solid fa-house`}></i>}>Home</Button>
        <Button third to='/album' icon={<i className="fa-solid fa-folder"></i>}>Album</Button>
        <Button third to='/images' icon={<i className="fa-solid fa-image"></i>}>Images</Button>
        <Button third to='/webcam' icon={<i className="fa-solid fa-camera"></i>}>Webcam</Button>
        {roleId < 2 &&
            <Button third icon={<i className="fa-solid fa-user-cog"></i>} onClick={handleOnclick} className={cx('btn-modifier')}>Manager</Button>
        }
        {
            showListManager &&
            <ul className={cx('list')}>
                {ListManager.map((item, index) => (
                    <li
                        key={index}
                        className={cx('list-item', { active: activeIndex === index })}
                        onClick={() => handleClick(index)}
                    >
                        <Link to={`${item.href}`} className={cx('link-modifier')}>{item.name}</Link>
                    </li>
                ))}
            </ul>

        }
    </div>
}
export default Sidebar;