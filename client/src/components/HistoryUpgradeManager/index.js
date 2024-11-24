import React, { useEffect, useState } from 'react';
import styles from './HistoryUpgradeManager.module.scss'
import classNames from 'classnames/bind'
import Table from '../Table';
import * as historyUpgradeService from '../../services/historyUpgrade';
const cx = classNames.bind(styles);
function HistoryUpgradeManager() {
    const [currentItems, setCurrentItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await historyUpgradeService.showAllHistoryUpgrades();
                setCurrentItems(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])

    const columns = [
        {
            title: 'ID',
            key: 'id',
            width: '10%',
        },
        {
            title: 'USERNAME',
            key: 'userName',
            width: '25%',
        },
        {
            title: 'PACKAGE',
            key: 'packageName',
            width: '15%',
        },
        {
            title: 'PRICE',
            key: 'price',
            width: '10%',
            render: (price) => {
                return `${price}$`
            }
        },
        {
            title: 'DATE',
            key: 'createdAt',
            width: '20%',
            render: (date) => {
                const handleDate = date.split('T17')[0];
                return `${handleDate}`;
            }
        },
        {
            title: 'STATUS',
            key: 'status',
            width: '20%',
        },
    ]
    return (<div className={cx('wrapper')}>
        <h1 className={cx('heading')}>History Upgrade</h1>
        <Table currentItems={currentItems} columns={columns} />
    </div>);
}
export default HistoryUpgradeManager;