import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductCard.module.scss';
import Tag from './Tag';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductCard = ({ props }) => {
    const navigate = useNavigate();


    // --- LOGIC XỬ LÝ ẢNH THÔNG MINH ---
    const getProductImage = () => {
        if (props.images && props.images.length > 0 && props.images[0].url) {
            return props.images[0].url;
        }
        return 'https://via.placeholder.com/200';
    };

    return (
        <div className={cx('card-wrapper')} onClick={() => navigate(`/product/${props._id}`)}>

            <img
                src={getProductImage()}
                alt="product-img"
                style={{ objectFit: 'cover' }}
            />

            <div className={cx('footer')}>
                <div className={cx('info')}>
                    <h2 className={cx('product-name')}>{props.name}</h2>
                    <span className={cx('product-type')}>{props.type}</span>
                </div>
                <span className={cx('product-price')}>
                    {props.newPrice ? props.newPrice.toLocaleString() : props.newPrice?.toLocaleString()} đ
                </span>
            </div>
            <div className={cx('tag')}>
                <Tag props={props.type} />
            </div>
        </div>
    );
};

export default ProductCard;