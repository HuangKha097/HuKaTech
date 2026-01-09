import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductList.module.scss';
import ProductCard from './ProductCard';
import * as ProductService from '../services/ProductService';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
const ProductList = ({ delay = 0.3 }) => {
    const [products, setProduct] = useState([]);
    const { category } = useParams();
    const decodedCategory = decodeURIComponent(category); // dich de su dung ( loai bo %20)
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductsByCategory(decodedCategory);
                setProduct(res?.data?.data);
            } catch (error) {
                console.log('Error :', error);
            }
        };
        fetchProduct();
    }, []);
    console.log(products);
    return (
        <div className={cx('container')}>
            <div className={cx('product-list')}>
                {products &&
                    products.length > 0 &&
                    products?.map((item, index) => {
                        return <ProductCard key={index} props={item} category={decodedCategory} />;
                    })}
            </div>
        </div>
    );
};

export default ProductList;
