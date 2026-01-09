import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/CustomerReviewCard.module.scss';
import banner1 from '../assets/images/hero1.jpg';

const cx = classNames.bind(styles);
const ProductCard = () => {
    return (
        <div className={cx('card-wrapper')}>
            <div className={cx('header')}>
                <div className={cx('info')}>
                    <img src={banner1} alt="avartar" />
                    <span className={cx('name')}>Grabriel</span>
                </div>
                <div className={cx('rating')}>
                    <svg
                        className={cx('star-rating')}
                        width="120"
                        height="24"
                        viewBox="0 0 120 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M5.825 21L7.45 13.975L2 9.25L9.2 8.625L12 2L14.8 8.625L22 9.25L16.55 13.975L18.175 21L12 17.275L5.825 21Z" />
                        <path d="M29.825 21L31.45 13.975L26 9.25L33.2 8.625L36 2L38.8 8.625L46 9.25L40.55 13.975L42.175 21L36 17.275L29.825 21Z" />
                        <path d="M53.825 21L55.45 13.975L50 9.25L57.2 8.625L60 2L62.8 8.625L70 9.25L64.55 13.975L66.175 21L60 17.275L53.825 21Z" />
                        <path d="M77.825 21L79.45 13.975L74 9.25L81.2 8.625L84 2L86.8 8.625L94 9.25L88.55 13.975L90.175 21L84 17.275L77.825 21Z" />
                        <path d="M101.825 21L103.45 13.975L98 9.25L105.2 8.625L108 2L110.8 8.625L118 9.25L112.55 13.975L114.175 21L108 17.275L101.825 21Z" />
                    </svg>
                </div>
            </div>
            <div className={cx('footer')}>
                <h3 className={cx('title')}>Smart Watch Pro</h3>
                <p className={cx('comment-content')}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex accusamus explicabo, earum voluptas
                    nostrum, quaerat similique aut maiores officiis natus cumque, modi repudiandae quae?
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
