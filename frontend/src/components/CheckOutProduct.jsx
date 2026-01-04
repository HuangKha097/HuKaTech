import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/CheckoutProduct.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {removeProduct, addProduct, decrementProduct} from "../redux/CartSlice.js";
import { faSortDown, faSortUp, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);
const CheckoutProduct = ({ item }) => {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.products);
    console.log(listProducts);

    const handleRemoveProductFromCart = (itemId) => {
        dispatch(removeProduct(itemId));
    }

    const handleIncreaseProduct = (item) => {
        dispatch(addProduct(item))
    }
    const handleDecreaseProduct = (item) => {
        dispatch(decrementProduct(item))
    }

    return (
        <div className={cx('card-wrapper')}>
            <img src={`data:image/jpeg;base64,${item.image_url
            }`} alt="product-img" />
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h2 className={cx('product-name')}>{item.product_name}</h2>
                    <div className={cx('price-quatity')}>
                        <span className={cx('product-price')}>$ {item.price}</span>
                        <div className={cx("quantity-container")}>
                            <button className={cx("quantity-change-button")} onClick={()=>handleIncreaseProduct(item)}><FontAwesomeIcon icon={faSortUp} /></button>
                            <span className={cx('quantity')} > &times; {item.quantity}</span>
                            <button className={cx("quantity-change-button")} onClick={()=>handleDecreaseProduct(item)}><FontAwesomeIcon icon={faSortDown} /></button>
                        </div>
                        <button className={cx("remove-item")} onClick={()=>handleRemoveProductFromCart(item.id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduct;
