import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductCard.module.scss';
import banner1 from '../assets/images/hero1.jpg';
import Tag from './Tag';
import {Link, useNavigate} from 'react-router-dom';

const cx = classNames.bind(styles);
const ProductCard = ({ props, category }) => {
    const navigate = useNavigate();
    return (

            <div className={cx('card-wrapper')} onClick={()=>navigate(`/product/${props._id}`)}>
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

    );
};

export default ProductCard;
