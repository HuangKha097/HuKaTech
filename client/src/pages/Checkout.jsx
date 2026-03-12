import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Checkout.module.scss';
import CheckoutProduct from '../components/CheckOutProduct.jsx';
import * as OrderService from '../services/OrdrerService';
import { Alert } from '@mui/material';
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Checkout = () => {

    const products = useSelector(state => state.cart.products);

    const [showAlert, setShowAlert] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [formOrder, setFormOrder] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        moreInfo: '',
        payMethod: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddOrder = async (values) => {
        try {
            const res = await OrderService.createNewOrder(values);
            console.log("Phản hồi từ Backend:", res);
            const responseData = res.data ? res.data : res;

            if (responseData.status === 'OK') {
                setShowAlert('success');
                setTimeout(() => {
                    localStorage.removeItem('persist:root');
                    window.location.href = '/';
                }, 3000);
            } else {
                setShowAlert('error');
                setErrorMessage(responseData.message || "Có lỗi xảy ra khi tạo đơn hàng!");
                setTimeout(() => {
                    setShowAlert('');
                }, 5000);
            }
        } catch (error) {
            console.log(error);
            setShowAlert('error');
            setErrorMessage("Lỗi kết nối máy chủ. Vui lòng thử lại sau!");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {showAlert === 'success' && (
                        <Alert className={cx('alert')} severity="success" onClose={() => setShowAlert('')}>
                            Đơn hàng của bạn đã được đặt thành công. Vui lòng kiểm tra email!
                        </Alert>
                    )}
                    {showAlert === 'error' && (
                        <Alert className={cx('alert')} severity="error" onClose={() => setShowAlert('')}>
                            {errorMessage || "Giỏ hàng của bạn đang trống, không thể đặt hàng!"}
                        </Alert>
                    )}

                    <div className={cx('checkout-wrapper')}>
                        <div className={cx('block-left')}>
                            <span className={cx('title')}>Shipping Information</span>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!products || products.length === 0) {
                                        setShowAlert('error');
                                        setErrorMessage("Giỏ hàng của bạn đang trống, không thể đặt hàng!");
                                        setTimeout(() => setShowAlert(''), 3000);
                                        return;
                                    }

                                    if (!formOrder.payMethod) {
                                        setShowAlert('error');
                                        setErrorMessage("Vui lòng chọn phương thức thanh toán!");
                                        setTimeout(() => setShowAlert(''), 3000);
                                        return;
                                    }

                                    handleAddOrder({ ...formOrder, cart: products });
                                }}
                            >
                                <label htmlFor="name">
                                    <input name="name" value={formOrder.name} className={cx('infor-input')} type="text" required placeholder="Full name" onChange={handleChange} />
                                </label>
                                <label>
                                    <input name="address" value={formOrder.address} className={cx('infor-input')} type="text" required placeholder="Address" onChange={handleChange} />
                                </label>
                                <label>
                                    <input name="phone" value={formOrder.phone} className={cx('infor-input')} type="text" required placeholder="Phone number" onChange={handleChange} />
                                </label>
                                <label>
                                    <input name="email" value={formOrder.email} className={cx('infor-input')} type="email" required placeholder="Email" onChange={handleChange} />
                                </label>
                                <div className={cx('address-detail-block')}>
                                    <label>
                                        <select name="city" value={formOrder.city} onChange={handleChange} required>
                                            <option value="">City</option>
                                            <option value="hcm">HCM</option>
                                            <option value="hanoi">Ha Noi</option>
                                            <option value="danang">Da Nang</option>
                                        </select>
                                    </label>
                                    <label>
                                        <input name="moreInfo" value={formOrder.moreInfo} className={cx('infor-input')} type="text" placeholder="More infor (Optional)" onChange={handleChange} />
                                    </label>
                                </div>

                                <span className={cx('title')}>Payment</span>
                                <label>
                                    <select name="payMethod" value={formOrder.payMethod} onChange={handleChange} required>
                                        <option value="">Select PayMethod</option>
                                        <option value="cash">Cash on Delivery</option>
                                        <option value="momo">Momo</option>
                                        <option value="banktransfer">Bank transfer</option>
                                    </select>
                                </label>

                                <button type="submit">Pay now</button>
                            </form>
                        </div>

                        <div className={cx('block-right')}>
                            <span className={cx('title')}>Order Summary</span>
                            <div className={cx('order-wrapper')}>
                                <div className={cx('body')}>
                                    {products && products.length > 0 ? (
                                        products.map((item, index) => <CheckoutProduct key={index} item={item} />)
                                    ) : (
                                        <span className={cx('no-product')}>No product</span>
                                    )}
                                </div>
                                <hr />
                                <div className={cx('detail-price')}>
                                    <div className={cx('more')}>
                                        <span>Subtotal</span>
                                        <div>
                                            <span className={cx('subtotal')}>
                                                {products ? products.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString() : 0} đ
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('more')}>
                                        <span>Shipping</span>
                                        <span>{products && products.length > 0 ? (35000).toLocaleString() : 0} đ</span>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx('total', 'more')}>
                                    <span>Total</span>
                                    <span>
                                        {products && products.length > 0
                                            ? products.reduce((sum, item) => sum + item.price * item.quantity, 35000).toLocaleString()
                                            : 0} đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;