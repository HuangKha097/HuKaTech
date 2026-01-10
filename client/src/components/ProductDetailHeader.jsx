import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetailHeader.module.scss';
import Tag from '../components/Tag';
import {motion} from 'framer-motion';
import {useDispatch} from "react-redux";
import {addProduct} from "../redux/CartSlice.js";

const cx = classNames.bind(styles);

const ProductDetailHeader = ({delay = 0.3, props}) => {
    const dispatch = useDispatch();
    const [currentProductImage, setCurrentProductImage] = useState(0);
    const imageLength = props.images.length - 1;
    // --- 1. Hàm lấy ảnh an toàn (Hybrid: Cloudinary + Base64) ---
    const getProductImage = () => {
        if (!props) return 'https://via.placeholder.com/300';

        // Ưu tiên 1: Dữ liệu MỚI (Cloudinary - Mảng images)
        // Kiểm tra kỹ xem mảng có tồn tại và có phần tử không
        if (props.images && Array.isArray(props.images) && props.images.length > 0) {
            return props.images[currentProductImage].url;
        }

        // Ưu tiên 2: Dữ liệu CŨ (Base64 - Chuỗi string)
        if (props.image) {
            // Kiểm tra xem chuỗi đã có prefix chưa, nếu chưa thì thêm vào
            return props.image.startsWith('data:image')
                ? props.image
                : `data:image/jpeg;base64,${props.image}`;
        }

        // Fallback: Ảnh mặc định nếu không có ảnh nào
        return 'https://via.placeholder.com/300';
    };

    const handleViewRightImage = () => {
        if ( currentProductImage < imageLength){
            setCurrentProductImage((prevState) => prevState + 1);
        }
    }
    const handleViewLeftImage = () => {
        if ( currentProductImage > 0){
            setCurrentProductImage((prevState) => prevState - 1);
        }
    }
    // --- 2. Xử lý thêm vào giỏ hàng ---
    const handleAddToCart = () => {
        if (!props || !props._id) {
            alert("Dữ liệu sản phẩm chưa tải xong!");
            return;
        }

        const payload = {
            id: props._id,
            product_name: props.name,
            quantity: 1,
            price: props.newPrice,
            // QUAN TRỌNG: Gọi hàm getProductImage để lấy URL chuỗi ngắn
            // Giúp Redux nhẹ hơn, không bị lỗi QuotaExceededError
            image_url: getProductImage(),
        };

        dispatch(addProduct(payload));
        alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
    }

    // Nếu dữ liệu chưa tải xong thì không render gì cả (hoặc render Skeleton loading)
    if (!props) return null;

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    {/* KHỐI ẢNH */}
                    <motion.div
                        className={cx('image')}
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: 'easeOut', delay}}
                        viewport={{once: true, amount: 0.2}}
                    >
                        <img src={getProductImage()} alt={props.name || 'Product'}/>

                        <button className={cx('next-btn', 'left')}  onClick={handleViewLeftImage} >&lt;</button>
                        <button className={cx('next-btn', 'right')} onClick={handleViewRightImage}>&gt;</button>
                    </motion.div>

                    {/* KHỐI THÔNG TIN */}
                    <motion.div
                        className={cx('info')}
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, ease: 'easeOut', delay}}
                        viewport={{once: true, amount: 0.2}}
                    >
                        <div className={cx('name-price')}>
                            {/* Ưu tiên hiển thị Category, nếu không có thì lấy Type */}
                            <Tag props={ props.type || 'General'}/>

                            <h2>{props.name}</h2>

                            <div className={cx('price')}>
                                {props.oldPrice > 0 && (
                                    <span className={cx('old-price')}>
                                        {props.oldPrice?.toLocaleString()} đ
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