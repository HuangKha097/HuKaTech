import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Submenu.module.scss';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setSubmenuValue, selectValue } from '../redux/SubmenuSlice';

const cx = classNames.bind(styles);
const Submenu = () => {
    const dispatch = useDispatch();
    const submenuValue = useSelector(selectValue);
    console.log(submenuValue);

    return (
        <ul className={cx('container')}>
            <Link
                to={`/category/Black%20Friday%20Deals`}
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/category/Black%20Friday%20Deals';
                }}
            >
                <li onClick={() => dispatch(setSubmenuValue('black-friday-deals'))}>Black Friday Deals</li>
            </Link>
            <Link
                to={`/category/New%20Arrivals`}
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/category/New%20Arrivals';
                }}
            >
                <li onClick={() => dispatch(setSubmenuValue('new-arrivals'))}>New Arrivals</li>
            </Link>
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/category/Hot%20Deals';
                }}
                to={`/category/Hot%20Deals`}
            >
                <li onClick={() => dispatch(setSubmenuValue('hot-deals'))}>Hot Deals</li>
            </Link>
            <Link
                onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/category/Discounts';
                }}
                to={`/category/Discounts`}
            >
                <li onClick={() => dispatch(setSubmenuValue('discouts'))}>Discounts</li>
            </Link>
        </ul>
    );
};

export default Submenu;
