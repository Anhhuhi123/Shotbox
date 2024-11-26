import classNames from 'classnames/bind';
import styles from './HistoryUpgrade.module.scss';
// import TableHistoryUpgrade from '../../../components/TableHistoryUpgrade';
import TableHistoryUpgrade from '../../../components/Table/HistoryUpgrade';

const cx = classNames.bind(styles);

function HistoryUpgrade() {
    return (
        <div className={cx('wrapper')}>
            <TableHistoryUpgrade />
        </div>
    );
}

export default HistoryUpgrade;
