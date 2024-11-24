import { useEffect, useState } from 'react';
import PaginatedItems from '../../components/PaginatedItems';
import styles from './Manager.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import CapacityManager from '../../components/CapacityManager';
import HistoryUpgradeManager from '../../components/HistoryUpgradeManager';
import * as historyUpgradeService from '../../services/historyUpgrade';

const cx = classNames.bind(styles);

function Manager() {
    const [isOpen, setIsOpen] = useState(false);
    const [listHistoryPanding, setListHistoryPanding] = useState([]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await historyUpgradeService.showHistoryUpgradePanding();
                setListHistoryPanding(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    })

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div className={cx('wrapper')}>
            <PaginatedItems itemsPerPage={2} />
            <CapacityManager />
            <HistoryUpgradeManager />
            <div className={cx('block-btn')}>
                <Button
                    third
                    onClick={toggleDropdown}
                    icon={<i className={`fa-solid fa-bell ${cx('icon-modifier')}`}></i>}
                    className={cx('btn-modifier')}>
                    <span className={cx('text')}>{listHistoryPanding.length}</span>
                </Button>
            </div>
            {isOpen && (
                <div className={cx('dropdown')}>
                    {listHistoryPanding.map((data, index) => (
                        <div key={index} className={cx('dropdown-item')}>
                            <strong>{data.userName}</strong>
                            <p className={cx('paragraph')}>Package Require: "{data.packageName}"</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Manager;
