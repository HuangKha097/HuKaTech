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
    const categorieData = useSelector(
        (state) => state.categories.list
    );



    return (
        <ul className={cx('container')}>
            {categorieData.length > 0 && categorieData.map((item, index) => (
                <Link
                    key={index}
                    to={`/category/${item}`}
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/category/${item.name}`;
                    }}
                >
                    <li onClick={() => dispatch(setSubmenuValue(item.name))}>{item.name}</li>
                </Link>
            ))}

        </ul>
    );
};

export default Submenu;
