import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetailHeader.module.scss';
import Tag from '../components/Tag';
import {motion} from 'framer-motion';
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/CartSlice.js";
import {useNavigate} from "react-router-dom";


const cx = classNames.bind(styles);

const ProductDetailHeader = ({delay = 0.3, props}) => {

    const listProduct = useSelector((state) => state.cart.products);

    console.log(listProduct)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentProductImage, setCurrentProductImage] = useState(0);
    const imageLength = props?.images?.length - 1;

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
        if (currentProductImage < imageLength) {
            setCurrentProductImage((prevState) => prevState + 1);
        }
    }
    const handleViewLeftImage = () => {
        if (currentProductImage > 0) {
            setCurrentProductImage((prevState) => prevState - 1);
        }
    }
    const createCartPayload = () => {
        return {
            id: props._id,
            product_name: props.name,
            quantity: 1,
            price: props.newPrice,
            image_url: getProductImage(),
            countInStock: props.countInStock,
        };
    };
    const handleAddToCart = () => {
        if (!props || !props._id) {
            alert("Dữ liệu sản phẩm chưa tải xong!");
            return;
        }
        if (props.countInStock <= 0 || props.status === 'out-of-stock') {
            alert("Rất tiếc, sản phẩm này hiện đã hết hàng!");
            return;
        }
        const cartItems = Array.isArray(listProduct) ? listProduct : (listProduct?.products || []);

        const productInCart = cartItems.find(item => item.id === props._id);
        const currentQuantityInCart = productInCart ? productInCart.quantity : 0;

        if (currentQuantityInCart >= props.countInStock) {
            alert(`Bạn đã thêm tối vượt quá số lượng trong kho - (${props.countInStock} sản phẩm) vào giỏ hàng!`);
            return;
        }


        dispatch(addProduct(createCartPayload()));
        alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
    }
    const handleBuyNow = () => {
        if (!props || !props._id) {
            alert("Dữ liệu sản phẩm chưa tải xong!");
            return;
        }
        if (props.countInStock <= 0 || props.status === 'out-of-stock') {
            alert("Rất tiếc, sản phẩm này hiện đã hết hàng!");
            return;
        }
        dispatch(addProduct(createCartPayload()));
        navigate('/checkout');
    }

    if (!props) return null;

    const isOutOfStock = props.countInStock <= 0 || props.status === 'out-of-stock';

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <motion.div
                        className={cx('image')}
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: 'easeOut', delay}}
                        viewport={{once: true, amount: 0.2}}
                    >
                        <img src={getProductImage()} alt={props.name || 'Product'}/>

                        <button className={cx('next-btn', 'left')} onClick={handleViewLeftImage}>&lt;</button>
                        <button className={cx('next-btn', 'right')} onClick={handleViewRightImage}>&gt;</button>
                    </motion.div>
                    <motion.div
                        className={cx('info')}
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, ease: 'easeOut', delay}}
                        viewport={{once: true, amount: 0.2}}
                    >
                        <div className={cx('name-price')}>
                            <Tag props={props.type || 'General'}/>

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
                            <p style={{marginTop: '10px', fontWeight: 'bold', color: isOutOfStock ? 'red' : 'green'}}>
                                {isOutOfStock ? 'Trạng thái: Đã hết hàng' : `Còn lại: ${props.countInStock} sản phẩm`}
                            </p>
                        </div>

                        <div className={cx('btn-group')}>
                            <button
                                className={cx('btn-add')}
                                onClick={handleAddToCart}
                                disabled={isOutOfStock}
                                style={{
                                    opacity: isOutOfStock ? 0.5 : 1,
                                    cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Add To Cart
                            </button>
                            <button
                                className={cx('btn-buy')}
                                onClick={handleBuyNow}
                                disabled={isOutOfStock}
                                style={{
                                    opacity: isOutOfStock ? 0.5 : 1,
                                    cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                                }}
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