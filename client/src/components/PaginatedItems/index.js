import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from "classnames/bind";
import Table from '../Table';
import * as userService from '../../services/userService';
import FormUpdate from "../FormUpdate";
import styles from './PaginatedItems.module.scss'
import Input from "../Input";
import Button from "../Button"
const cx = classNames.bind(styles)

function PaginatedItems({ itemsPerPage }) {
    const [items, setItems] = useState([]); // State to hold fetched data
    const [itemOffset, setItemOffset] = useState(0); // Pagination offset
    const [loading, setLoading] = useState(true); // Loading state
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [userId, setUserId] = useState(null);
    const [capacity, setCapacity] = useState(null);
    const [checkRoleId, setCheckRoleId] = useState(null);
    const [valueInput, setValueInput] = useState('');
    const [fullItems, setFullItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.getAllUsers();
                setItems(res);
                setFullItems(res);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    // Calculate pagination variables
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };
    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator
    }
    const columns = [
        {
            title: 'ID',
            key: 'id',
            width: '10%',
        },
        {
            title: 'Name',
            key: 'name',
            width: '20%',
        },
        {
            title: 'EMAIL',
            key: 'email',
            width: '25%',
        },
        {
            title: 'ROLEID',
            key: 'roleId',
            width: '10%',
            render: (roleId) => (roleId === 1 ? 'Admin' : 'User'),
        },
        {
            title: 'CAPACITY',
            key: 'capacity',
            width: '15%',
            render: (capacity) => `${capacity}MB`,
        },
    ]
    const actions = [
        {
            title: 'UPDATE',
            width: '20%',
            handler: (item) => {
                const { id, name, roleId, capacity } = item;
                setCheckRoleId(roleId);
                setUserId(id);
                setCapacity(capacity);
                setShowFormUpdate(true);
            }
        }
    ]

    const handleOnchange = (e) => {
        setValueInput(e.target.value);
        const newItems = fullItems.filter((fullItem, index) => {
            return fullItem.name.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setItems(newItems);
    }
    return (
        <>
            <h1 className={cx('header')}>Manage User</h1>
            <div className={cx('block-search')}>
                <Input className={cx('input')}
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Search...."
                    value={valueInput}
                    onChange={handleOnchange}
                />
                <Button className={cx('btn-search')} icon={<i className="fa-solid fa-magnifying-glass"></i>} ></Button>
            </div>
            <Table currentItems={currentItems} columns={columns} actions={actions} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                className={cx("modifier")}
            />
            {showFormUpdate && (
                <FormUpdate
                    setShowFormUpdate={setShowFormUpdate}
                    checkRoleId={checkRoleId}
                    userId={userId}
                    capacity={capacity}
                />
            )}
        </>
    );
}
export default PaginatedItems;