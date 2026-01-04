import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductDetailHeader.module.scss';
import Tag from '../components/Tag';


import { motion } from 'framer-motion';

import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/CartSlice.js";

const cx = classNames.bind(styles);
const ProductDetailHeader = ({ delay = 0.3, props }) => {
 const products = useSelector(state => state.cart.products);
    console.log("product", products);
    const dispatch = useDispatch();

    const handleAddToCart = (value) => {
        if (!props || !props._id) return;
        const payload = {
            id: value._id,
            product_name: value.name,
            quantity: 1,
            price: value.newPrice,
            image_url: value.image,
        }
        dispatch(addProduct(payload));
    }

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <motion.div
                        className={cx('image')}
                        initial={{ opacity: 0, y: 50 }} // bắt đầu mờ + lệch xuống
                        whileInView={{ opacity: 1, y: 0 }} // khi scroll tới thì hiện ra
                        transition={{ duration: 0.6, ease: 'easeOut', delay }}
                        viewport={{ once: true, amount: 0.2 }}
                        // once: true => chỉ chạy 1 lần
                        // amount: 0.2 => khi 20% phần tử xuất hiện thì bắt đầu animate
                    >
                        <img src={`data:image/jpeg;base64,${props.image}`} alt="image" />
                        <button className={cx('next-btn', 'left')}>&lt;</button>
                        <button className={cx('next-btn', 'right')}>&gt;</button>
                    </motion.div>
                    <motion.div
                        className={cx('info')}
                        initial={{ opacity: 0, x: 50 }} // bắt đầu mờ + lệch xuống
                        whileInView={{ opacity: 1, x: 0 }} // khi scroll tới thì hiện ra
                        transition={{ duration: 0.6, ease: 'easeOut', delay }}
                        viewport={{ once: true, amount: 0.2 }}
                        // once: true => chỉ chạy 1 lần
                        // amount: 0.2 => khi 20% phần tử xuất hiện thì bắt đầu animate
                    >
                        <div className={cx('name-price')}>
                            <Tag props={props.type} />
                            <h2>{props.name}</h2>
                            <div className={cx('price')}>
                                {props.oldPrice && <span className={cx('old-price')}>{props}</span>}
                                <span className={cx('new-price')}>{props.newPrice}</span>
                            </div>
                        </div>
                        <div className={cx('desc')}>
                            <p>{props.description}</p>
                        </div>
                        <div className={cx('btn-group')}>
                            <button className={cx('btn-add')} onClick={()=>handleAddToCart(props)}>
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
