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
    // const listProducts = useSelector((state) => state.products); // Tạm ẩn nếu không dùng tới để clean code

    const handleRemoveProductFromCart = (itemId) => {
        dispatch(removeProduct(itemId));
    }

    const handleIncreaseProduct = (item) => {
        // Kiểm tra: Nếu số lượng hiện tại đã bằng hoặc vượt tồn kho thì chặn lại
        if (item.quantity >= item.countInStock) {
            alert(`Sản phẩm này chỉ còn tối đa ${item.countInStock} cái trong kho!`);
            return;
        }
        dispatch(addProduct(item));
    }

    const handleDecreaseProduct = (item) => {
        // Chặn không cho số lượng tụt xuống dưới 1 (nếu muốn xóa thì dùng nút thùng rác)
        if (item.quantity <= 1) {
            return;
        }
        dispatch(decrementProduct(item));
    }

    return (
        <div className={cx('card-wrapper')}>
            <img src={item.image_url} alt="product-img" />
            <div className={cx('body')}>
                <div className={cx('info')}>
                    <h2 className={cx('product-name')}>{item.product_name}</h2>
                    <div className={cx('price-quatity')}>
                        <span className={cx('product-price')}>{item.price?.toLocaleString()} đ</span>
                        <div className={cx("quantity-container")}>
                            {/* Nút tăng */}
                            <button
                                className={cx("quantity-change-button")}
                                onClick={() => handleIncreaseProduct(item)}
                                disabled={item.quantity >= item.countInStock} // Giao diện: Disable nút nếu đạt giới hạn
                            >
                                <FontAwesomeIcon icon={faSortUp} />
                            </button>

                            <span className={cx('quantity')} > &times; {item.quantity}</span>

                            {/* Nút giảm */}
                            <button
                                className={cx("quantity-change-button")}
                                onClick={() => handleDecreaseProduct(item)}
                                disabled={item.quantity <= 1} // Giao diện: Disable nút nếu chỉ còn 1
                            >
                                <FontAwesomeIcon icon={faSortDown} />
                            </button>
                        </div>
                        <button className={cx("remove-item")} onClick={() => handleRemoveProductFromCart(item.id)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutProduct;