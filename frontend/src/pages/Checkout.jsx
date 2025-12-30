import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Checkout.module.scss';
import Tag from '../components/Tag';
import CheckoutProduct from '../components/CheckOutProduct.jsx';
import * as OrderService from '../services/OrdrerService';

import { Alert, AlertTitle } from '@mui/material';
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);
const Checkout = () => {
    const products= useSelector(state => state.cart.products);
    console.log("products", products);

    const [showAlert, setShowAlert] = useState(['']);

    const [response, setResponse] = useState('');
    const [formOrder, setFormOrder] = useState({
        name: '',
        email: '',
        phone: 0,
        address: '',
        city: '',
        moreInfo: '',
        payMethod: '',
        cart: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormOrder((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handeAddOrder = async (values) => {
        try {
            const res = await OrderService.createNewOrder(values);
            setResponse(res);
            console.log(res);

            if (res?.statusText === 'OK') {
                setShowAlert('success');
                setTimeout(() => {
                    localStorage.clear();
                    window.location.reload();
                }, 3000);
            }
        } catch (error) {
            console.log(error);
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
                            Your order was placed successfully. Please check your email.
                        </Alert>
                    )}
                    {showAlert === 'error' && (
                        <Alert className={cx('alert')} severity="error" onClose={() => setShowAlert('')}>
                            Your cart is emty, can not order !!
                        </Alert>
                    )}
                    <div className={cx('checkout-wrapper')}>
                        <div className={cx('block-left')}>
                            <span className={cx('tittle')}>Shipping Information</span>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const getCart = localStorage.getItem('cart');
                                    const cart = JSON.parse(getCart);
                                    if (!cart) {
                                        setShowAlert('error');
                                        setTimeout(() => {
                                            setShowAlert('');
                                        }, 3000);
                                        return;
                                    }
                                    cart && handeAddOrder({ ...formOrder, cart });
                                }}
                            >
                                <label htmlFor="name">
                                    <input
                                        name="name"
                                        value={formOrder.name}
                                        className={cx('infor-input')}
                                        type="text"
                                        required
                                        placeholder="Full name"
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <input
                                        name="address"
                                        value={formOrder.address}
                                        className={cx('infor-input')}
                                        type="text"
                                        required
                                        placeholder="Address"
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <input
                                        name="phone"
                                        value={formOrder.phone}
                                        className={cx('infor-input')}
                                        type="text"
                                        required
                                        placeholder="Phone number"
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    <input
                                        name="email"
                                        value={formOrder.email}
                                        className={cx('infor-input')}
                                        type="email"
                                        required
                                        placeholder="Email"
                                        onChange={handleChange}
                                    />
                                </label>
                                <div className={cx('address-detail-block')}>
                                    <label>
                                        <select name="city" value={formOrder.city} onChange={handleChange}>
                                            <option value="">City</option>
                                            <option value="hcm">HCM</option>
                                            <option value="hanoi">Ha Noi</option>
                                            <option value="danang">Da Nang</option>
                                        </select>
                                    </label>
                                    <label>
                                        <input
                                            name="moreInfo"
                                            value={formOrder.moreInfo}
                                            className={cx('infor-input')}
                                            type="text"
                                            placeholder="More infor"
                                            onChange={handleChange}
                                        />
                                    </label>
                                </div>
                                <span className={cx('tittle')}>Payment</span>
                                <label>
                                    <select name="payMethod" value={formOrder.payMethod} onChange={handleChange}>
                                        <option value="">PayMethod</option>
                                        <option value="cash">Cash</option>
                                        <option value="momo">Momo</option>
                                        <option value="banktransfer">Bank transfer</option>
                                    </select>
                                </label>

                                <button type="submit">Pay now</button>
                            </form>
                        </div>
                        <div className={cx('block-right')}>
                            <span className={cx('tittle')}>Order Summary</span>
                            <div className={cx('oder-wrapper')}>
                                <div className={cx('body')}>
                                    {products ? (
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
                                                ${' '}
                                                {products
                                                    ? products.reduce(
                                                          (sum, item) => sum + item.price * item.quantity,
                                                          0,
                                                      )
                                                    : 0}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('more')}>
                                        <span>Shipping</span>
                                        <span>${products ? 35000 : 0}</span>
                                    </div>
                                </div>
                                <hr />
                                <div className={cx('total', 'more')}>
                                    <span>Total</span>
                                    <span>
                                        ${' '}
                                        {products
                                            ? products.reduce(
                                                  (sum, item) => sum + item.price * item.quantity + 35000,
                                                  0,
                                              )
                                            : 0}{' '}
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
