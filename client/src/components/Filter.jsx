import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Filter.module.scss';
import { motion } from 'framer-motion';
import * as ProductService from '../services/ProductService';
const cx = classNames.bind(styles);

const Filter = ({ onFilterChange }) => {
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    console.log('value :', price + ' ', category);

    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({ category });
        }
    }, [category]);

    return (
        <div className={cx('container')}>
            <motion.label
                htmlFor="sort"
                className={cx('sort')}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
                <select
                    value={price}
                    name="price"
                    id="price"
                    className={cx('select-price')}
                    onChange={(e) => setPrice(decodeURIComponent(e.target.value))}
                >
                    <option value="">Price</option>
                    <option value="less than 10">&lt; $10</option>
                    <option value="10 to 25">$10 - $25</option>
                    <option value="25 to 50">$25 - $50</option>
                    <option value="more than 50">&gt; $50</option>
                </select>
                <button name="price" id="price" className={cx('price-sort')}>
                    Price
                </button>
                <select
                    value={category}
                    name="category"
                    id="category"
                    className={cx('category')}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Category</option>
                    <option value="New Arrivals">New Arrivals</option>
                    <option value="Hot Deals">Hot Deals</option>
                    <option value="Black Friday">Black Friday</option>
                    <option value="Discounts">Discounts</option>
                </select>
            </motion.label>
        </div>
    );
};

export default Filter;
