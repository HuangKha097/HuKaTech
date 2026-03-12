import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetailHeader.module.scss';
import CustomerReview from '../components/CustomerReview';
import ProductDetailHeader from '../components/ProductDetailHeader';
import NewLetter from '../components/Newsletter';
import * as ProductService from '../services/ProductService';
import {useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import RelatedProducts from "../components/RelatedProducts.jsx";

const cx = classNames.bind(styles);

const ProductDetail = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            try {
                const res = await ProductService.getProductsById(id);

                if (res?.data) {
                    console.log(res?.data.images);
                    setProduct(res.data);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const fadeUp = (delay = 0) => ({
        initial: {opacity: 0, y: 40},
        whileInView: {opacity: 1, y: 0},
        transition: {duration: 0.6, ease: 'easeOut', delay},
        viewport: {once: true, amount: 0.2},
    });
    if (loading) {
        return (
            <div className={cx('container')}
                 style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h2>Loading Product...</h2>
            </div>
        );
    }
    if (!product) {
        return <div className={cx('container')}>Product not found</div>;
    }

    return (
        <div className={cx('container')}>

            <motion.div className={cx('header')} {...fadeUp(0)}>
                <ProductDetailHeader props={product}/>
            </motion.div>
            {product?.category && (
                <motion.div className={cx('related')} {...fadeUp(0.2)}>
                    <RelatedProducts
                        type={product.type}
                        currentProductId={id}
                    />

                </motion.div>
            )}

            <motion.div className={cx('review')} {...fadeUp(0.4)}>
                <CustomerReview/>
            </motion.div>

            <motion.div className={cx('news-letter')} {...fadeUp(0.6)}>
                <NewLetter/>
            </motion.div>
        </div>
    );
};

export default ProductDetail;