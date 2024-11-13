import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'
import Button from '../Button'
import { useSelector } from "react-redux";
const cx = classNames.bind(styles)
function Sidebar() {
    const roleId = useSelector((state) => state.auth.roleId);
    return <div className={cx('wrapper')}>
        {/* <Button third to='/home' icon={<i className={`fa-solid fa-house cx{${'abc'}}`}></i>}>Home</Button>
         */}
        <Button third to='/home' icon={<i className={`fa-solid fa-house`}></i>}>Home</Button>
        <Button third to='/album' icon={<i className="fa-solid fa-folder"></i>}>Album</Button>
        <Button third to='/images' icon={<i className="fa-solid fa-image"></i>}>Images</Button>
        <Button third to='/webcam' icon={<i className="fa-solid fa-camera"></i>}>Webcam</Button>
        {roleId < 2 &&
            <Button third to='/manager' icon={<i className="fa-solid fa-user-cog"></i>}>Manager</Button>
        }
    </div>
}
export default Sidebar;