import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetailHeader.module.scss';
import Tag from '../components/Tag';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/CartSlice.js";

const cx = classNames.bind(styles);

const ProductDetailHeader = ({ delay = 0.3, props }) => {
    // const products = useSelector(state => state.cart.products); // Không cần dòng này nếu chỉ dispatch
    const dispatch = useDispatch();

    // --- 1. Hàm xử lý ảnh (Dùng chung cho cả hiển thị và Redux) ---
    const getProductImage = () => {
        if (!props) return '';

        // Ưu tiên 1: Sản phẩm MỚI (Mảng images, có sẵn url chuẩn)
        if (props.images && props.images.length > 0 && props.images[0].url) {
            return props.images[0].url;
        }

        // Ưu tiên 2: Sản phẩm CŨ (Trường image string, cần thêm prefix)
        if (props.image) {
            return `data:image/jpeg;base64,${props.image}`;
        }

        return 'https://via.placeholder.com/300'; // Ảnh mặc định
    };

    const handleAddToCart = () => {
        if (!props || !props._id) return;

        // --- 2. Fix Payload Redux: Gửi link ảnh ĐÃ XỬ LÝ vào giỏ ---
        const payload = {
            id: props._id,
            product_name: props.name,
            quantity: 1,
            price: props.newPrice,
            image_url: getProductImage(), // Quan trọng: Gọi hàm lấy ảnh chuẩn
        }
        dispatch(addProduct(payload));
        alert("Đã thêm vào giỏ hàng!"); // Thông báo nhẹ (tuỳ chọn)
    }

    // Nếu props chưa load xong thì không render để tránh lỗi
    if (!props) return null;

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <motion.div
                        className={cx('image')}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* 3. Dùng hàm getProductImage() vào src */}
                        <img src={getProductImage()} alt={props.name} />

                        <button className={cx('next-btn', 'left')}>&lt;</button>
                        <button className={cx('next-btn', 'right')}>&gt;</button>
                    </motion.div>

                    <motion.div
                        className={cx('info')}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className={cx('name-price')}>
                            <Tag props={props.category || props.type} /> {/* Fix: Có thể dùng category nếu type null */}
                            <h2>{props.name}</h2>
                            <div className={cx('price')}>
                                {/* 4. Fix lỗi hiển thị giá cũ: props -> props.oldPrice */}
                                {props.oldPrice && (
                                    <span className={cx('old-price')}>
                                        {props.oldPrice.toLocaleString()} đ
                                    </span>
                                )}
                                <span className={cx('new-price')}>
                                    {props.newPrice?.toLocaleString()} đ
                                </span>
                            </div>
                        </div>
                        <div className={cx('desc')}>
                            <p>{props.description}</p>
                        </div>
                        <div className={cx('btn-group')}>
                            <button className={cx('btn-add')} onClick={handleAddToCart}>
                                Add To Cart
                            </button>
                            <button className={cx('btn-buy')}>Buy Now</button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailHeader;