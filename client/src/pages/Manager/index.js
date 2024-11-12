import styles from './Manager.module.scss'
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)
function Manager() {
    return (<div className={cx('wrapper')}>Manager</div>);
}

export default Manager;