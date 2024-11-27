import classNames from 'classnames/bind';
import styles from './Capacity.module.scss';
import CapacityManager from '../../../components/Manager/CapacityManager';

const cx = classNames.bind(styles);

function Capacity() {
    return (
        <div className={cx('wrapper')}>
            <CapacityManager />
        </div>
    );
}

export default Capacity;
