import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductCard.module.scss';
import banner1 from '../assets/images/hero1.jpg';
import Tag from './Tag';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const ProductCard = ({ props, category }) => {
    return (
        <Link
            to={`/product/${props._id}`}
            onClick={(e) => {
                e.preventDefault();
                window.location.href = `/product/${props._id}`;
            }}
        >
            <div className={cx('card-wrapper')}>
                <img src={`data:image/jpeg;base64,${props.image}`} alt="product-img" />
                <div className={cx('footer')}>
                    <div className={cx('info')}>
                        <h2 className={cx('product-name')}>{props.name}</h2>
                        <span className={cx('product-type')}>{props.type}</span>
                    </div>
                    <span className={cx('product-price')}>{props.newprice}</span>
                </div>
                <div className={cx('tag')}>
                    <Tag props={category} />
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
