import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/CustomerReview.module.scss';
import CustomerReviewCard from '../components/CustomerReviewCard';
import { motion } from 'framer-motion';
const cx = classNames.bind(styles);
const CustomerReview = () => {
    return (
        <div className={cx('container')}>
            <h2>Customer Reviews</h2>
            <div className={cx('content')}>
                <div className={cx('reviews-wrapper')}>
                    <CustomerReviewCard />
                    <CustomerReviewCard />
                    <CustomerReviewCard />
                    <CustomerReviewCard />
                    <CustomerReviewCard />
                    <CustomerReviewCard />
                </div>
            </div>
        </div>
    );
};

export default CustomerReview;
