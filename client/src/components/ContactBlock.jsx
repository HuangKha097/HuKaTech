import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ContactBlock.module.scss';

const cx = classNames.bind(styles);

const ContactBlock = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsShowButton(window.scrollY > 600);
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
            {isShowButton && (
                <button
                    className={cx('link-btn')}
                    onClick={() => window.open('https://chat.zalo.me/', '_blank')}
                >
                    Zalo
                </button>
            )}

            {isShowButton && (
                <button onClick={scrollToTop} className={cx('move-top')}>
                    <svg viewBox="0 0 24 24">
                        <path d="M12 9L17 14H7L12 9Z" fill="#FAFAFA"/>
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ContactBlock;