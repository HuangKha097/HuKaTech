import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/FAQ.module.scss';
import Tag from '../components/Tag';
import { motion, AnimatePresence } from 'framer-motion';

const cx = classNames.bind(styles);

const FAQ = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Chính sách vận chuyển của HUKA như thế nào?",
            answer: "Chúng tôi cung cấp dịch vụ giao hàng miễn phí cho tất cả các đơn hàng trên 500k. Thời gian giao hàng tiêu chuẩn là 3-5 ngày làm việc. Đối với giao hàng hỏa tốc, bạn sẽ nhận được hàng trong vòng 24h (chỉ áp dụng nội thành)."
        },
        {
            question: "Tôi có thể đổi trả sản phẩm không?",
            answer: "Có, chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày nhận hàng. Sản phẩm phải còn nguyên vẹn, đầy đủ bao bì và phụ kiện. Phí vận chuyển chiều trả lại sẽ do khách hàng chi trả trừ khi lỗi thuộc về nhà sản xuất."
        },
        {
            question: "Các phương thức thanh toán được chấp nhận?",
            answer: "Chúng tôi chấp nhận thanh toán qua thẻ Visa/Mastercard, chuyển khoản ngân hàng và thanh toán khi nhận hàng (COD). Tất cả giao dịch trực tuyến đều được bảo mật tuyệt đối."
        },
        {
            question: "Làm sao để theo dõi đơn hàng của tôi?",
            answer: "Sau khi đơn hàng được gửi đi, chúng tôi sẽ gửi mã vận đơn (Tracking ID) qua email của bạn. Bạn có thể nhập mã này tại trang 'Tra cứu đơn hàng' để xem lộ trình chi tiết."
        },
        {
            question: "Sản phẩm có được bảo hành không?",
            answer: "Tất cả các thiết bị điện tử tại HUKA đều được bảo hành chính hãng 12 tháng. Nếu có lỗi kỹ thuật, hãy liên hệ với bộ phận CSKH để được hỗ trợ sửa chữa hoặc đổi mới."
        }
    ];

    // Animation cho danh sách xuất hiện
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <div className={cx('container')}>
            {/* Header nằm trực tiếp trong container */}
            <motion.div
                className={cx('header')}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Tag props={'Support'} />
                <h2 className={cx('title')}>Frequently Asked Questions</h2>
            </motion.div>

            {/* Body chứa padding lớn, bọc lấy danh sách câu hỏi */}
            <div className={cx('body')}>
                <motion.div
                    className={cx('faq-list')}
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {faqData.map((item, index) => (
                        <motion.div
                            key={index}
                            className={cx('faq-item', { active: activeIndex === index })}
                            variants={itemVariants}
                        >
                            <div
                                className={cx('question')}
                                onClick={() => toggleAccordion(index)}
                            >
                                <h3>{item.question}</h3>
                                <span className={cx('icon')}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        className={cx('answer-wrapper')}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <p className={cx('answer')}>{item.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;