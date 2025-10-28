import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/DetailCategory.module.scss';
import Newsletter from '../components/Newsletter';
import Tag from '../components/Tag';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../components/ProductList';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const DetailCategory = () => {
    const { category } = useParams();
    const decodedCategory = decodeURIComponent(category); // loại bỏ %20

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className={cx('header')}
                >
                    <Tag props={decodedCategory} />
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                        className={cx('title')}
                    >
                        As Hot As They Come. Shop Now!
                    </motion.h1>
                    <motion.label
                        htmlFor="search"
                        className={cx('search')}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
                    >
                        <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                        <input type="text" id="search" placeholder="Search gadgets, devices" />
                    </motion.label>
                </motion.div>

                {/* Product List */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <ProductList category={decodedCategory} />
                </motion.div>

                {/* Newsletter */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Newsletter />
                </motion.div>
            </div>
        </div>
    );
};

export default DetailCategory;
