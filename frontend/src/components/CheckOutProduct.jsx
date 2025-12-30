import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/CheckoutProduct.module.scss';
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);
const CheckoutProduct = ({ item }) => {

    return (
        <div className={cx('card-wrapper')}>
            <img src={`data:image/jpeg;base64,${item.image_url
            }`} alt="product-img" />
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h2 className={cx('product-name')}>{item.product_name}</h2>
                    <div className={cx('price-quatity')}>
                        <span className={cx('product-price')}>$ {item.price}</span>
                        <span className={cx('quantity')}> &times; {item.quantity}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduct;
