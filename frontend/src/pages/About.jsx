import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/About.module.scss';
import Tag from '../components/Tag';
import { motion } from 'framer-motion';

const cx = classNames.bind(styles);

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const paragraphs = [
        'Introducing our state-of-the-art Bluetooth speaker – your ultimate companion for immersive audio bliss! Designed to deliver unparalleled sound quality, this sleek and compact marvel boasts crystal-clear highs, rich mids, and thumping bass.',
        "With seamless Bluetooth connectivity, enjoy wireless freedom to stream your favorite tunes from any device. Whether you're hosting a party, relaxing at home, or on-the-go, this speaker ensures an unforgettable auditory journey.",
        "Crafted with premium materials and built to last, it's not just a speaker – it's a statement of style and sophistication. Don't settle for ordinary sound – unleash the power of extraordinary with our Black Friday exclusive offer!",
        'Introducing our state-of-the-art Bluetooth speaker – your ultimate companion for immersive audio bliss! Designed to deliver unparalleled sound quality, this sleek and compact marvel boasts crystal-clear highs, rich mids, and thumping bass.',
        "With seamless Bluetooth connectivity, enjoy wireless freedom to stream your favorite tunes from any device. Whether you're hosting a party, relaxing at home, or on-the-go, this speaker ensures an unforgettable auditory journey.",
        "Crafted with premium materials and built to last, it's not just a speaker – it's a statement of style and sophistication. Don't settle for ordinary sound – unleash the power of extraordinary with our Black Friday exclusive offer!",
    ];

    // Container để delay lần lượt các <p>
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.3, // cách nhau 0.3s
            },
        },
    };

    // Animation cho từng đoạn text
    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <motion.div
                    className={cx('header')}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <Tag props={'About'} />
                    <h2 className={cx('title')}>Altech. The Brand. The Online Gadget Store</h2>
                </motion.div>

                <motion.div
                    className={cx('body')}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {paragraphs.map((text, index) => (
                        <motion.p key={index} variants={itemVariants}>
                            {text}
                        </motion.p>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default About;
