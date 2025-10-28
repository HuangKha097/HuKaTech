import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ContactBlock.module.scss';

const cx = classNames.bind(styles);
const ContactBlock = () => {
    const [isShowMoveTop, setIsShoMoveTop] = useState(false);
    const [isShowHotLine, setIsShoHotLine] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsShoHotLine(window.scrollY > 100);
            setIsShoMoveTop(window.scrollY > 600);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div className={cx('wrapper')}>
            {/* {isShowHotLine && <button className={cx('hotline')}>0912345678</button>} */}
            {isShowMoveTop && (
                <button onClick={scrollToTop} className={cx('move-top')}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 15L7 10H17L12 15Z" fill="#FAFAFA" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ContactBlock;
