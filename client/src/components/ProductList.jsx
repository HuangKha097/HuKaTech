import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductList.module.scss';
import ProductCard from './ProductCard';
import * as ProductService from '../services/ProductService';
import {useParams} from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const {category} = useParams();
    const decodedCategory = decodeURIComponent(category);

    const limit = 9;

    useEffect(() => {
        setCurrentPage(1);
    }, [decodedCategory]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const skip = (currentPage - 1) * limit;
                const res = await ProductService.getProductsByCategory(decodedCategory, limit, skip);
                console.log("res", res);

                if (res && res.data) {
                    setProducts(res.data);
                    const totalItems = res.total || 0;
                    setTotalPage(Math.ceil(totalItems / limit));
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
    }, [decodedCategory, currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPage) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className={cx('container')}>
            {loading ? (
                <div style={{textAlign: 'center', padding: '50px 0'}}>
                    Đang tải sản phẩm...
                </div>
            ) : (
                <>
                    <div className={cx('product-list')}>
                        {products && products.length > 0 ? (
                            products.map((item) => (
                                <ProductCard
                                    key={item._id || item.id}
                                    props={item}
                                    category={decodedCategory}
                                />
                            ))
                        ) : (
                            <div style={{width: '100%', textAlign: 'center'}}>
                                Không tìm thấy sản phẩm nào
                            </div>
                        )}
                    </div>

                    {totalPage > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '30px' }}>
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                            >
                                Trang trước
                            </button>

                            <span>Trang {currentPage} / {totalPage}</span>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPage}
                                style={{ padding: '8px 16px', cursor: currentPage === totalPage ? 'not-allowed' : 'pointer' }}
                            >
                                Trang sau
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductList;