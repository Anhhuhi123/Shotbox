import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import classNames from "classnames/bind";
import Table from '../Table';
import * as userService from '../../services/userService';
import styles from './PaginatedItems.module.scss'
const cx = classNames.bind(styles)

function PaginatedItems({ itemsPerPage }) {
    const [items, setItems] = useState([]); // State to hold fetched data
    const [itemOffset, setItemOffset] = useState(0); // Pagination offset
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await userService.getAllUsers();
                // console.log(res);
                setItems(res);
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

    return (
        <>
            <Table currentItems={currentItems} />
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
        </>
    );
}

export default PaginatedItems;