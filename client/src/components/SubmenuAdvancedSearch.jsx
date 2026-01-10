import React from 'react'; // Bỏ useEffect nếu không dùng
import classNames from 'classnames/bind';
import styles from '../assets/css/SubmenuAdvancedSearch.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { removeSubfilterValue, setSubfilterValue } from "../redux/SubfilterSlice.js";

const cx = classNames.bind(styles);

const SubmenuAdvancedSearch = () => {
    const dispatch = useDispatch();
    // Lấy danh sách đang được chọn từ Redux
    const listFilters = useSelector(state => state.subfilter.value) || []; // Thêm || [] để tránh lỗi nếu state null

    const categories = ["Laptops", "Audio", "Wearables", "Drones", "PC/Components", "Accessories"];
    const priceRange = ["$0-$100", "$101-$500", "$501+"];
    const brands = ["Apple", "Samsung", "Asus", "DJI", "Sony", "Logitech"];

    // SỬA LẠI HÀM NÀY: Dùng event onChange
    const handleToggleFilter = (e) => {
        const value = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            // Nếu tick vào -> Thêm vào mảng
            // Lưu ý: Logic này giả định action setSubfilterValue nhận vào cả mảng mới
            // Nếu action của bạn chỉ nhận 1 giá trị để push thì sửa lại code này
            const newValue = [...listFilters, value];
            dispatch(setSubfilterValue(newValue));
        } else {
            // Nếu bỏ tick -> Xóa khỏi mảng
            dispatch(removeSubfilterValue(value));
        }
    };

    return (
        <div className={cx('container')}>
            {/* Nhóm Category */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Category</span>
                {categories.map((item, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            name="category"
                            value={item}
                            // 1. Kiểm tra xem item có trong listFilters không để tick
                            checked={listFilters.includes(item)}
                            // 2. Đổi onClick thành onChange
                            onChange={handleToggleFilter}
                        />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Price */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Price Range</span>
                {priceRange.map((item, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            name="priceRange"
                            value={item}
                            checked={listFilters.includes(item)}
                            onChange={handleToggleFilter}
                        />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Brand */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Brand</span>
                {brands.map((item, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            name="brand"
                            value={item}
                            checked={listFilters.includes(item)}
                            onChange={handleToggleFilter}
                        />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SubmenuAdvancedSearch;