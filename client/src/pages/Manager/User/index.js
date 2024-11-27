import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './User.module.scss';
import UserManager from '../../../components/Manager/UserManager';
import Button from '../../../components/Button';
import * as historyUpgradeService from '../../../services/historyUpgrade';
const cx = classNames.bind(styles);

function User() {
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
    }, [])
    const toggleDropdown = () => setIsOpen((prev) => !prev);
    return (
        <div className={cx('wrapper')}>
            <UserManager itemsPerPage={5} />
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
                    {listHistoryPanding.length > 0
                        ? listHistoryPanding.map((data, index) => (
                            <div key={index} className={cx('dropdown-item')}>
                                <strong>{data.userName}</strong>
                                <p className={cx('paragraph')}>Package Require: "{data.packageName}"</p>
                            </div>
                        ))
                        : <div className={cx('dropdown-item', 'no-notification')}>
                            <trong>
                                No notification
                            </trong>
                        </div>
                    }
                </div>
            )
            }
        </div >
    );
}

export default User;
