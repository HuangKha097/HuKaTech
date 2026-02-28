import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetailHeader.module.scss';
import Tag from '../components/Tag';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/CartSlice.js";
import {useNavigate} from "react-router-dom"; // Thêm useNavigate để chuyển hướng


const cx = classNames.bind(styles);

const ProductDetailHeader = ({delay = 0.3, props}) => {

    const listProduct = useSelector((state) => state.cart.products);

    console.log(listProduct)
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Khởi tạo navigate
    const [currentProductImage, setCurrentProductImage] = useState(0);
    const imageLength = props?.images?.length - 1;

    // --- 1. Hàm lấy ảnh an toàn ---
    const getProductImage = () => {
        if (!props) return 'https://via.placeholder.com/300';

        if (props.images && Array.isArray(props.images) && props.images.length > 0) {
            return props.images[currentProductImage].url;
        }

        if (props.image) {
            return props.image.startsWith('data:image')
                ? props.image
                : `data:image/jpeg;base64,${props.image}`;
        }

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

    // --- Hàm tạo payload chuẩn để dùng chung cho Add to Cart & Buy Now ---
    const createCartPayload = () => {
        return {
            id: props._id,
            product_name: props.name,
            quantity: 1,
            price: props.newPrice,
            image_url: getProductImage(),
            countInStock: props.countInStock, // QUAN TRỌNG: Gửi kèm số lượng tồn kho lên Redux
        };
    };

    // --- 2. Xử lý thêm vào giỏ hàng ---
    const handleAddToCart = () => {
        if (!props || !props._id) {
            alert("Dữ liệu sản phẩm chưa tải xong!");
            return;
        }

        // Chặn nếu hết hàng
        if (props.countInStock <= 0 || props.status === 'out-of-stock') {
            alert("Rất tiếc, sản phẩm này hiện đã hết hàng!");
            return;
        }
        const cartItems = Array.isArray(listProduct) ? listProduct : (listProduct?.products || []);

        const productInCart = cartItems.find(item => item.id === props._id);
        const currentQuantityInCart = productInCart ? productInCart.quantity : 0;

        if (currentQuantityInCart >= props.countInStock) {
            alert(`Bạn đã thêm tối vượt quá số lượng trong kho - (${props.countInStock} sản phẩm) vào giỏ hàng!`);
            return; // Dừng lại, không cho thêm nữa
        }


        dispatch(addProduct(createCartPayload()));
        alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
    }

    // --- 3. Xử lý nút Buy Now ---
    const handleBuyNow = () => {
        if (!props || !props._id) {
            alert("Dữ liệu sản phẩm chưa tải xong!");
            return;
        }

        // Chặn nếu hết hàng
        if (props.countInStock <= 0 || props.status === 'out-of-stock') {
            alert("Rất tiếc, sản phẩm này hiện đã hết hàng!");
            return;
        }

        // Thêm vào giỏ hàng
        dispatch(addProduct(createCartPayload()));

        // Chuyển hướng sang trang checkout (Bạn có thể đổi '/checkout' thành '/cart' tùy route dự án của bạn)
        navigate('/checkout');
    }

    if (!props) return null;

    // Kiểm tra trạng thái hết hàng để vô hiệu hóa nút bấm
    const isOutOfStock = props.countInStock <= 0 || props.status === 'out-of-stock';

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
                            {/* Hiển thị dòng thông báo tồn kho cho khách hàng thấy */}
                            <p style={{ marginTop: '10px', fontWeight: 'bold', color: isOutOfStock ? 'red' : 'green' }}>
                                {isOutOfStock ? 'Trạng thái: Đã hết hàng' : `Còn lại: ${props.countInStock} sản phẩm`}
                            </p>
                        </div>

                        <div className={cx('btn-group')}>
                            <button
                                className={cx('btn-add')}
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                style={{ opacity: isOutOfStock ? 0.5 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                            >
                                Add To Cart
                            </button>
                            <button
                                className={cx('btn-buy')}
                                onClick={handleBuyNow}
                                disabled={isOutOfStock}
                                style={{ opacity: isOutOfStock ? 0.5 : 1, cursor: isOutOfStock ? 'not-allowed' : 'pointer' }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailHeader;