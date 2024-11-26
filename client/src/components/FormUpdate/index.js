import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FormUpdate.module.scss';
import * as userService from '../../services/userService';
import * as capacityPackageService from '../../services/capacityPackageService';
import * as historyUpgradeService from '../../services/historyUpgrade';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);
function FormUpdate({ setShowFormUpdate, checkRoleId, userId, capacity }) {
    const roleSelectRef = useRef();
    const capacitySelectRef = useRef();
    const [listCapacityPackage, setListCapacityPackage] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [upgradePending, setUpgradePeding] = useState([]);
    const arrPackage = [];
    upgradePending.map((item) => {
        arrPackage.push(item.size);
    })
    console.log(arrPackage)
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await historyUpgradeService.showUpgradePending(userId);
                setUpgradePeding(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    const updateRoleIdData = async (data) => {
        try {
            const res = await userService.updateRoleId(data);
            toast.success(`Success:${res.message}`, {
                position: "bottom-center",
                autoClose: 1000,
                onClose: () => {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.log(error);
            toast.success(`Error:${error.respone.data.message}`, {
                position: "bottom-center",
                autoClose: 1000,
            });
        }
    }
    const updateCapacityData = async (data1, data2) => {
        try {
            const res1 = await userService.updateRoleId(data1);
            const res2 = await userService.updateUserCapacity(data2);
            if (res1.message && res2.message) {
                toast.success(`Success: Updated successfully`, {
                    position: "bottom-center",
                    autoClose: 1000,
                    onClose: () => {
                        window.location.reload();
                    }
                });
            }
        } catch (error) {
            console.log(error);
            toast.success(`Error: Update Failed`, {
                position: "bottom-center",
                autoClose: 1000,
            });
        }
    }
    const handleSave = (e) => {
        setIsSaving(true);
        const roleSelectElement = roleSelectRef.current;
        const capacitySelectElement = capacitySelectRef.current;
        if (capacitySelectElement.selectedIndex > 0 && arrPackage.length > 0) {

            if (arrPackage.includes(parseInt(capacitySelectElement.value))) {
                const data1 = {
                    newRoleId: parseInt(roleSelectElement.value),
                    userId: userId,
                }

                const data2 = {
                    newCapacity: parseInt(capacitySelectElement.value),
                    userId: userId,
                }
                updateCapacityData(data1, data2);
            }
            else {
                toast.error('Please choose correct capacity package', {
                    position: 'bottom-center',
                    autoClose: 1000,
                })
            }
            setIsSaving(false);
        }
        else if (capacitySelectElement.selectedIndex > 0 && arrPackage.length === 0) {
            toast.error('User dont require upgrade', {
                position: 'bottom-center',
                autoClose: 1000,
            })
            setIsSaving(false);
        }
        else {
            const data = {
                newRoleId: parseInt(roleSelectElement.value),
                userId: userId,
            }
            updateRoleIdData(data);
        }
    }
    const handleCancel = (e) => {
        if (isSaving) return;
        setShowFormUpdate(false);
    }

    return (<div className={cx('wrapper1')}>
        <div className={cx('wrapper')}>

            <label htmlFor="roleId">Choose a role:</label>
            <select name="role" id="role" defaultValue={checkRoleId} ref={roleSelectRef}>
                <option value="1">Admin</option>
                <option value="2">User</option>
            </select>

            <label htmlFor="capacity">Choose a capacity:</label>
            <select name="capacity" id="capacity" ref={capacitySelectRef}>
                <option value="option">Option</option>
                {
                    listCapacityPackage && listCapacityPackage.map((item) => {
                        return arrPackage.includes(item.size) ? <option key={item.id} value={`${item.size}`} className={cx('option-modifier')}>{`${item.name} - ${item.size}MB`}</option> : <option key={item.id} value={`${item.size}`} >{`${item.name} - ${item.size}MB`}</option>
                    })
                }
            </select>
            <div>
                <button className={cx('btn')} onClick={handleCancel}>Cancel</button>
                <button className={cx('btn')} onClick={handleSave}>Save</button>
            </div>
        </div>
        <ToastContainer />
    </div>);
}

export default FormUpdate;