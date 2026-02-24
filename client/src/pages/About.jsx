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

        "Tại HUKA, chúng tôi tin rằng công nghệ không chỉ là những công cụ vô tri, mà là nghệ thuật của cuộc sống hiện đại. Được thành lập với niềm đam mê bất tận dành cho sự đổi mới, HUKA không chỉ là một cửa hàng, mà là điểm đến của những tín đồ yêu thích sự tinh tế, hiệu năng và phong cách.",


        "Chúng tôi không chạy theo số lượng, mà tập trung vào sự 'tinh tuyển'. Mỗi sản phẩm tại HUKA – từ thiết bị âm thanh đắm chìm đến phụ kiện thông minh – đều phải vượt qua những tiêu chuẩn khắt khe nhất về thẩm mỹ và độ bền. Chúng tôi mang đến những thiết bị không chỉ hoạt động tốt mà còn phải đẹp như một món đồ trang sức công nghệ.",


        "Hơn cả một trải nghiệm mua sắm, HUKA cam kết đồng hành cùng bạn trong kỷ nguyên số. Với dịch vụ khách hàng tận tâm và chính sách hậu mãi uy tín, chúng tôi ở đây để giúp bạn tìm thấy những mảnh ghép hoàn hảo giúp nâng tầm không gian sống và phong cách làm việc của chính mình.",


        "Sự hài lòng của bạn là thước đo thành công duy nhất của chúng tôi. Tại HUKA, mọi giao dịch đều bắt đầu từ sự tin tưởng và kết thúc bằng nụ cười hài lòng.",

        "Đổi mới không ngừng nghỉ. Chúng tôi luôn tiên phong cập nhật những xu hướng công nghệ mới nhất trên thế giới để đưa về ngay trong tầm tay bạn.",

        "HUKA - Nơi công nghệ chạm đến cảm xúc. Hãy cùng chúng tôi khám phá và kiến tạo nên phong cách sống của riêng bạn ngay hôm nay."
    ];

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
