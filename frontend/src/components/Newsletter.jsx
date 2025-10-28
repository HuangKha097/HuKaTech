import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Newsletter.module.scss';

import { motion } from 'framer-motion';
const cx = classNames.bind(styles);
const Newsletter = () => {
    return (
        <div className={cx('container')}>
            <h3 className={cx('title')}>Stay Updated on Latest Product Releases</h3>
            <p className={cx('desc')}>Never Miss a beat and stay update with new product arrivals and promotions</p>
            <form>
                <input type="email" name="input" id="input" placeholder="Email Address" />
                <button type="submit">Subscribe</button>
            </form>
        </div>
    );
};

export default Newsletter;
