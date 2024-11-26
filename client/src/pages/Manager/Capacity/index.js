import classNames from 'classnames/bind';
import styles from './Capacity.module.scss';
import TableCapacity from '../../../components/Table/Capacity';
const cx = classNames.bind(styles);

function Capacity() {
    return (
        <div className={cx('wrapper')}>
            <TableCapacity />
        </div>
    );
}

export default Capacity;
