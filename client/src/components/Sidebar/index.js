import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss'
import Button from '../Button'
import { useSelector } from "react-redux";
const cx = classNames.bind(styles)
function Sidebar() {
    const roleId = useSelector((state) => state.auth.roleId);
    return <div className={cx('wrapper')}>
        <Button third to='/home' className={cx('modify')}>Home</Button>
        <Button third to='/album'>Album</Button>
        <Button third to='/images'>Images</Button>
        <Button third to='/webcam'>Webcam</Button>
        {roleId < 2 &&
            <Button third to='/manager'>Manager</Button>
        }
    </div>
}
export default Sidebar;