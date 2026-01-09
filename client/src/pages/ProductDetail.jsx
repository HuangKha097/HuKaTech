import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetail.module.scss';
import ProductShow from '../components/ProductShow';
import CustomerReview from '../components/CustomerReview';
import ProductDetailHeader from '../components/ProductDetailHeader';
import NewLetter from '../components/Newsletter';
import * as ProductService from '../services/ProductService';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchLoadProduct = async () => {
            try {
                const res = await ProductService.getProductsById(id);
                setProduct(res?.data?.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchLoadProduct();
    }, [id]);

    // animation config
    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut', delay },
        viewport: { once: true, amount: 0.2 },
    });

    return (
        <div className={cx('container')}>
            <motion.div className={cx('header')} {...fadeUp(0)}>
                <ProductDetailHeader props={product} />
            </motion.div>

            <motion.div className={cx('related')} {...fadeUp(0.2)}>
                <ProductShow category={product.category} />
            </motion.div>

            <motion.div className={cx('review')} {...fadeUp(0.4)}>
                <CustomerReview />
            </motion.div>

            <motion.div className={cx('news-letter')} {...fadeUp(0.6)}>
                <NewLetter />
            </motion.div>
        </div>
    );
};

export default ProductDetail;
