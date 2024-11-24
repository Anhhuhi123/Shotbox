import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames/bind';
import styles from './UpgradeCapacity.module.scss';
import * as capacityPackageService from '../../services/capacityPackageService';
import * as historyUpgradeService from '../../services/historyUpgrade';
import Button from '../../components/Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const handleOnclick = (e, item) => {
        const data = {
            capacityPackageId: item.id,
        }
        const fetchData = async () => {
            try {
                const res = await historyUpgradeService.createHistoryUpgrade(data);
                toast.success(`Success:${res.message}`, {
                    position: 'bottom-center',
                    autoClose: 1000,
                })
                // const res = await historyUpgradeService.showAllHistoryUpgrades();
                // console.log(res.data);
            } catch (error) {
                console.log(error);
                toast.error(`Error:${error.response.data.message}`, {
                    position: 'bottom-center',
                    autoClose: 1000,
                })
            }
        }
        fetchData();
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('block')}>
                {
                    listCapacityPackage && listCapacityPackage.map((item, index) => {
                        return <div className={cx('card')} key={index}>
                            <h3 className={cx('heading-title')}>{item.name}</h3>
                            <h1 className={cx('heading-price')}>{item.price}$</h1>
                            <span>{item.description}</span>
                            <Button first onClick={(e) => handleOnclick(e, item)}>Select</Button>
                        </div>
                    })
                }
            </div>
            <ToastContainer />
        </div>)
        ;
}

export default UpgradeCapacity;