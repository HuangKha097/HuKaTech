import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Hero.module.scss';
import {motion} from 'framer-motion';
import {banner1, banner2, banner3} from '../assets/images/index.js';

const cx = classNames.bind(styles);
const Hero = ({delay = 0.3}) => {

    const heroBg = [banner1, banner2, banner3];
    const [currentIndex, setCurrentIndex] = useState(0);

    const items = Array.from({ length: 8 }, () => "⚡Black Friday Deals!");

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex === heroBg.length - 1 ? 0 : prevIndex + 1);
        }, 5000)
        return () => clearInterval(interval);
    }, [])

    const handleClickDots = (index) => {
        setCurrentIndex(index);
    }
    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.6, ease: 'easeOut', delay}}
            viewport={{once: true, amount: 0.2}}

        >
            <div className={cx('container')} style={{
                backgroundImage: `url(${heroBg[currentIndex]})`
            }}>
                <div className={cx('content')}>
                    <div className={cx('main-block')}>
                        <div className={cx('text-block')}>
                            <h1>All tech products. One place.</h1>
                            <p>Shop all gadget related to making your work life easy. 70% cash back guarantee!</p>
                        </div>
                        <ul className={cx('list-banner')}>
                            <li onClick={() => handleClickDots(0)} className={cx(currentIndex === 0 && 'active')}>.</li>
                            <li onClick={() => handleClickDots(1)} className={cx(currentIndex === 1 && 'active')}>.</li>
                            <li onClick={() => handleClickDots(2)} className={cx(currentIndex === 2 && 'active')}>.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={cx("banner")}>
                <div className={cx("banner-track")}>
                    {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i}>⚡ Black Friday Deals!</span>
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                        <span key={"copy-" + i}>⚡ Black Friday Deals!</span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Hero;
