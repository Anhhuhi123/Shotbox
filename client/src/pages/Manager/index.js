import { useState } from 'react';
import PaginatedItems from '../../components/PaginatedItems';
import styles from './Manager.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/Button';

const cx = classNames.bind(styles);

function Manager() {
    const [isOpen, setIsOpen] = useState(false);
    const [users] = useState([
        { id: 1, name: 'John Doe', title: 'Administrator' },
        { id: 2, name: 'Jane Smith', title: 'Manager' },
        { id: 3, name: 'Alice Johnson', title: 'Designer' },
        { id: 4, name: 'NguyenQuocTien', title: 'IT' },
    ]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    return (
        <div className={cx('wrapper')}>
            <div>Manager</div>
            <PaginatedItems itemsPerPage={2} />
            <Button
                third
                onClick={toggleDropdown}
                icon={<i className={`fa-solid fa-bell ${cx('icon-modifier')}`}></i>}
                className={cx('btn-modifier')}
            />
            {isOpen && (
                <div className={cx('dropdown')}>
                    {users.map((user) => (
                        <div key={user.id} className={cx('dropdown-item')}>
                            <strong>{user.name}</strong>
                            <p>{user.title}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Manager;
