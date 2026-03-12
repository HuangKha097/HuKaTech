import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductShow.module.scss';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import * as ProductService from '../services/ProductService';

const cx = classNames.bind(styles);

const ProductShow = ({ category }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!category) return;

        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductsByCategory(category);
                if (res?.data) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        };
        fetchProduct();
    }, [category]);

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <span className={cx('title')}>{category}</span>
                    <Link to={`/category/${encodeURIComponent(category)}`}>
                        <span className={cx('see-all')}>
                            See all
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.775"
                                height="20"
                                fill="none"
                                viewBox="0 0 11.775 20"
                            >
                                <path
                                    d="M 1.775 20 L 0 18.225 L 8.225 10 L 0 1.775 L 1.775 0 L 11.775 10 Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className={cx('body')}>
                    {products && products.length > 0 ? (

                        products.slice(0, 3).map((item) => {
                            return (
                                <ProductCard

                                    key={item._id || item.id}
                                    props={item}
                                    category={category}
                                />
                            );
                        })
                    ) : (
                        <div style={{color: '#fff', padding: '20px'}}>Đang tải sản phẩm...</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductShow;