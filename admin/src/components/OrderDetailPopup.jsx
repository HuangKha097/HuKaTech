import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/OrderDetailPopup.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const OrderDetailPopup = ({ isOpen, onClose, order }) => {
    // Nếu không mở hoặc không có data thì không render gì cả
    if (!isOpen || !order) return null;

    // Tính tổng tiền đơn hàng (giả định cấu trúc cart có price và quantity)
    const calculateTotal = () => {
        if (!order.cart || order.cart.length === 0) return 0;
        return order.cart.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);
    };

    return (
        <div className={cx('overlay')} onClick={onClose}>
            <div className={cx('modal')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('header')}>
                    <h2>Order Details: #{order._id.substring(order._id.length - 6).toUpperCase()}</h2>
                    <button className={cx('closeBtn')} onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                <div className={cx('body')}>
                    <div className={cx('infoGrid')}>
                        <div className={cx('infoCard')}>
                            <h3>Customer Information</h3>
                            <p><strong>Name:</strong> {order.name}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                        </div>
                        <div className={cx('infoCard')}>
                            <h3>Shipping & Payment</h3>
                            <p><strong>City:</strong> {order.city}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                            <p><strong>Pay Method:</strong> {order.payMethod}</p>
                            <p>
                                <strong>Status:</strong>
                                <span style={{
                                    marginLeft: '8px', padding: '2px 8px', borderRadius: '4px', fontSize: '1.2rem',
                                    backgroundColor: order.status === 'Cancelled' ? '#fee2e2' : '#dcfce3',
                                    color: order.status === 'Cancelled' ? '#dc2626' : '#16a34a'
                                }}>
                                    {order.status}
                                </span>
                            </p>
                        </div>
                    </div>

                    {order.moreInfo && (
                        <div className={cx('infoCard')}>
                            <h3>Additional Notes</h3>
                            <p>{order.moreInfo}</p>
                        </div>
                    )}

                    <div className={cx('tableContainer')}>
                        <table>
                            <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>
                            </thead>
                            <tbody>
                            {order.cart && order.cart.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={item.image_url || 'https://via.placeholder.com/40'}
                                            alt={item.product_name}
                                            className={cx('productImg')}
                                        />
                                    </td>
                                    <td>{item.product_name || `Product ID: ${item.productId}`}</td>
                                    <td>{item.price?.toLocaleString()} đ</td>
                                    <td>x{item.quantity}</td>
                                    <td><b>{((item.price || 0) * (item.quantity || 1)).toLocaleString()} đ</b></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={cx('totalAmount')}>
                        Total Amount: <span>{calculateTotal().toLocaleString()} đ</span>
                    </div>
                </div>

                {/* Footer */}
                <div className={cx('footer')}>
                    <button className={cx('closeActionBtn')} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailPopup;