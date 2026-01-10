import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductList.module.scss';
import ProductCard from './ProductCard';
import * as ProductService from '../services/ProductService';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductList = () => {
    // Nên đặt tên setProducts (số nhiều) cho chuẩn convention
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false); // Nên thêm state loading

    const { category } = useParams();
    // Decode để xử lý các ký tự đặc biệt hoặc dấu cách (ví dụ: "Smart%20Phone" -> "Smart Phone")
    const decodedCategory = decodeURIComponent(category);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await ProductService.getProductsByCategory(decodedCategory);

                // Kiểm tra dựa trên cấu trúc trả về từ Service
                // Nếu Service trả về { status: "OK", data: [...] }
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

    }, [decodedCategory]); // <--- QUAN TRỌNG: Phải có biến này để khi đổi URL thì fetch lại API

    // Hiển thị loading (Optional)
    if (loading) {
        return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading...</div>;
    }

    return (
        <div className={cx('container')}>
            <div className={cx('product-list')}>
                {products && products.length > 0 ? (
                    products.map((item) => {
                        // Lưu ý: key nên dùng id của sản phẩm thay vì index để tối ưu hiệu năng React
                        return (
                            <ProductCard
                                key={item._id || item.id}
                                props={item}
                                category={decodedCategory}
                            />
                        );
                    })
                ) : (
                    // Xử lý khi không có sản phẩm nào
                    <div style={{width: '100%', textAlign: 'center'}}>Không tìm thấy sản phẩm nào</div>
                )}
            </div>
        </div>
    );
};

export default ProductList