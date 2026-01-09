import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/ProductCard.module.scss';
import Tag from './Tag';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const ProductCard = ({ props, category }) => {
    const navigate = useNavigate();

    // --- LOGIC XỬ LÝ ẢNH THÔNG MINH ---
    const getProductImage = () => {
        // TRƯỜNG HỢP 1: Dữ liệu mới (Mảng images, đã có sẵn "data:image...")
        if (props.images && props.images.length > 0 && props.images[0].url) {
            return props.images[0].url;
        }

        // TRƯỜNG HỢP 2: Dữ liệu cũ (Trường image đơn lẻ)
        if (props.image) {
            // Vì dữ liệu cũ của bạn là chuỗi raw, cần cộng thêm tiền tố
            return `data:image/jpeg;base64,${props.image}`;
        }

        // TRƯỜNG HỢP 3: Không có ảnh -> Trả về ảnh rỗng hoặc placeholder
        return 'https://via.placeholder.com/200';
    };

    return (
        <div className={cx('card-wrapper')} onClick={() => navigate(`/product/${props._id}`)}>
            {/* Gọi hàm lấy ảnh ở đây, bỏ hết các tiền tố cứng trong src */}
            <img
                src={getProductImage()}
                alt="product-img"
                style={{ objectFit: 'cover' }}
            />

            <div className={cx('footer')}>
                <div className={cx('info')}>
                    <h2 className={cx('product-name')}>{props.name}</h2>
                    <span className={cx('product-type')}>{props.type}</span>
                </div>
                <span className={cx('product-price')}>
                    {props.newPrice ? props.newPrice.toLocaleString() : props.newprice?.toLocaleString()} đ
                </span>
            </div>
            <div className={cx('tag')}>
                <Tag props={category} />
            </div>
        </div>
    );
};

export default ProductCard;