import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar'
import UpLoad from '../../components/Upload';
import classnames from 'classnames/bind';
import styles from './UpgradeLayout.module.scss';
const cx = classnames.bind(styles);
function UpgradeLayout({ children }) {
    const stateUpload = useSelector(state => state.upload.value)

    return (<div className={cx('wrapper')}>
        <Navbar defaultLayout href='/home' />
        {children}
        {stateUpload &&
            <UpLoad />
        }
    </div>);
}

export default UpgradeLayout;