import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './UpgradeCapacity.module.scss';
import * as capacityPackageService from '../../services/capacityPackageService';
import Button from '../../components/Button'
const cx = classnames.bind(styles);
function UpgradeCapacity() {
    const [listCapacityPackage, setListCapacityPackage] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await capacityPackageService.showAllCapacityPackages();
                setListCapacityPackage(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (<div className={cx('wrapper')}>
        {
            listCapacityPackage && listCapacityPackage.map((item) => {
                return <div className={cx('card')}>
                    <h3 className={cx('heading-title')}>{item.name}</h3>
                    <h1 className={cx('heading-price')}>{item.price}$</h1>
                    <span>{item.description}</span>
                    <Button first>Select</Button>
                </div>
            })
        }
    </div>);
}

export default UpgradeCapacity;