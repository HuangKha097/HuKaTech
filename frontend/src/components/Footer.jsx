import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Footer.module.scss';

const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <div className={cx('container')}>
            <div className={cx('block-left')}>
                <h1>All tech products. One place.</h1>
                <p>Shop all gadget related to making your work life easy. 70% cash back guarantee!</p>
            </div>
            <div className={cx('block-right')}>
                <ul className={cx('product')}>
                    Product
                    <li>Hotdeals</li>
                    <li>Discounts</li>
                    <li>New Arrivals</li>
                    <li>Black Friday deals</li>
                </ul>
                <ul className={cx('socials')}>
                    Socials
                    <li>Support</li>
                    <li>
                        Twitter{' '}
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#FFFFFF" />
                        </svg>
                    </li>
                    <li>
                        Instagram{' '}
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#FFFFFF" />
                        </svg>
                    </li>
                    <li>
                        Facebook{' '}
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#FFFFFF" />
                        </svg>
                    </li>
                </ul>
                <ul className={cx('information')}>
                    Information
                    <li>News</li>
                    <li>FAQ</li>
                    <li>About</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
