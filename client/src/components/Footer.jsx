import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Footer.module.scss';
import {Link} from "react-router-dom";

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
                    <Link to={"/category/Hot%20Deals"}>Hotdeals</Link>
                    <Link to={"/category/Discounts"}>Discounts</Link>
                    <Link to={"/category/New%20Arrivals"}>New Arrivals</Link>
                    <Link to={'/category/Black%20Friday%20Deals'}>Black Friday deals</Link>
                </ul>
                <ul className={cx('socials')}>
                    Socials
                    <li>Support</li>
                    <li onClick={()=> window.open("https://x.com", "_blank")}>
                        Twitter{' '}
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="currentColor"/>
                        </svg>
                    </li>
                    <li onClick={()=> window.open("https://instagram.com", "_blank")}>
                        Instagram{' '}
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="currentColor"/>
                        </svg>
                    </li>
                    <li onClick={()=> window.open("https://facebook.com", "_blank")}>
                        Facebook{' '}
                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="currentColor"/>
                        </svg>
                    </li>
                </ul>
                <ul className={cx('information')}>
                    Information
                    <li>News</li>
                    <Link to={"/faq"}>FAQ</Link>
                    <Link to={"/about"}>About</Link>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
