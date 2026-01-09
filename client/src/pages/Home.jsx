import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ProductShow from '../components/ProductShow';
import CustomerReview from '../components/CustomerReview';
import Newsletter from '../components/Newsletter';
import classNames from 'classnames/bind';
import styles from '../assets/css/Home.module.scss';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

const Home = () => {
    const typeProductList = ['Hot Deals', 'Discounts', 'New Arrivals', 'Black Friday Deals'];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Cấu hình chung cho animation
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut', delay },
        viewport: { once: true, amount: 0.2 },
    });

    return (
        <div className={cx('container')}>
            <Hero />

            {typeProductList.map((cat, index) => (
                <motion.div key={cat} {...fadeUp(index * 0.2)}>
                    <ProductShow category={cat} />
                </motion.div>
            ))}

            <motion.div {...fadeUp(0.2)}>
                <CustomerReview />
            </motion.div>

            <motion.div {...fadeUp(0.4)}>
                <Newsletter />
            </motion.div>
        </div>
    );
};

export default Home;
