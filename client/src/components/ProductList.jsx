import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductList.module.scss';
import ProductCard from './ProductCard';
import * as ProductService from '../services/ProductService';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const { category } = useParams();
    const decodedCategory = decodeURIComponent(category);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await ProductService.getProductsByCategory(decodedCategory);
                if (res?.data) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.log('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        if (decodedCategory) {
            fetchProduct();
        }

    }, [decodedCategory]);
    if (loading) {
        return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading...</div>;
    }

    return (
        <div className={cx('container')}>
            <div className={cx('product-list')}>
                {products && products.length > 0 ? (
                    products.map((item) => {
                        return (
                            <ProductCard
                                key={item._id || item.id}
                                props={item}
                                category={decodedCategory}
                            />
                        );
                    })
                ) : (
                    <div style={{width: '100%', textAlign: 'center'}}>Không tìm thấy sản phẩm nào</div>
                )}
            </div>
        </div>
    );
};

export default ProductList