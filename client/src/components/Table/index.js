import classNames from "classnames/bind";
import { useState } from "react";
import styles from './Table.module.scss';
import FormUpdate from "../FormUpdate";

const cx = classNames.bind(styles);

function Table({ currentItems }) {
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [userId, setUserId] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [checkRoleId, setCheckRoleId] = useState(null);

    const handleOnclick = (roleId, userId, capacity) => {
        setCheckRoleId(roleId);
        setUserId(userId);
        setCapacity(capacity);
        setShowFormUpdate(true);
    };

    const renderRows = () => {
        return currentItems.map((item) => {
            const role = item.roleId === 1 ? 'Admin' : 'User';
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{role}</td>
                    <td>{`${item.capacity}MB`}</td>
                    <td>
                        <button
                            className={cx('btn')}
                            onClick={() => handleOnclick(item.roleId, item.id, item.capacity)}
                        >
                            Update
                        </button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>id</th>
                        <th style={{ width: "20%" }}>name</th>
                        <th style={{ width: "25%" }}>email</th>
                        <th style={{ width: "10%" }}>roleId</th>
                        <th style={{ width: "15%" }}>capacity</th>
                        <th style={{ width: "20%" }}>update</th>
                    </tr>
                </thead>
                <tbody>{currentItems && renderRows()}</tbody>
            </table>
            {showFormUpdate && (
                <FormUpdate
                    setShowFormUpdate={setShowFormUpdate}
                    checkRoleId={checkRoleId}
                    userId={userId}
                    capacity={capacity}
                />
            )}
        </div>
    );
}

export default Table;
