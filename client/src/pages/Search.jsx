import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/DetailCategory.module.scss';
import Newsletter from '../components/Newsletter';
import Tag from '../components/Tag';
import { motion } from 'framer-motion';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ProductList from '../components/ProductList';
import { useParams } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

const cx = classNames.bind(styles);

const Search = () => {
    const { value } = useParams();
    const [products, setProducts] = useState([]);
    const decodedCategory = decodeURIComponent(value); // loại bỏ %20
    console.log(value);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await ProductService.getProductsByName(value);
                setProducts(res?.data?.data);
                console.log('res: ', res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, [value]);

    const handleFilterChange = async ({ category }) => {
        if (category) {
            const res = await ProductService.getProductsByCategory(category);
            setProducts(res?.data?.data || []);
        }
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [value]);

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
                </motion.div>
                <Filter onFilterChange={handleFilterChange} />
                {/* Product List */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className={cx('products-wrapper')}>
                        {products && products.length > 0 ? (
                            products.map((item, index) => {
                                return <ProductCard key={index} props={item} category={item.category} />;
                            })
                        ) : (
                            <p className={cx('no-product-found')}>No product</p>
                        )}
                    </div>
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

export default Search;
