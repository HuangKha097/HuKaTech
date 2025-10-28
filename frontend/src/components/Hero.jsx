import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Hero.module.scss';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);
const Hero = ({ delay = 0.3 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // bắt đầu mờ + lệch xuống
            whileInView={{ opacity: 1, y: 0 }} // khi scroll tới thì hiện ra
            transition={{ duration: 0.6, ease: 'easeOut', delay }}
            viewport={{ once: true, amount: 0.2 }}
            // once: true => chỉ chạy 1 lần
            // amount: 0.2 => khi 20% phần tử xuất hiện thì bắt đầu animate
        >
            <div className={cx('container')}>
                <div className={cx('content')}>
                    <div className={cx('text-block')}>
                        <h1>All tech products. One place.</h1>
                        <p>Shop all gadget related to making your work life easy. 70% cash back guarantee!</p>
                    </div>
                </div>
            </div>
            <div className={cx('banner')}>
                <span>⚡Black Friday Deals!</span>
                <span>⚡Black Friday Deals!</span>
                <span>⚡Black Friday Deals!</span>
                <span>⚡Black Friday Deals!</span>
                <span>⚡Black Friday Deals!</span>
                <span>⚡Black Friday Deals!</span>
                <span>⚡Black Friday Deals!</span>
            </div>
        </motion.div>
    );
};

export default Hero;
