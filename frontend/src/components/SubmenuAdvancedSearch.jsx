import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/SubmenuAdvancedSearch.module.scss';

const cx = classNames.bind(styles);

const SubmenuAdvancedSearch = () => {
    const categories = ["Laptops", "Audio", "Wearables", "Drones", "PC Components", "Accessories"];
    const priceRange = ["$0-$100", "$101-$500", "$501+"];
    const brands = ["Apple", "Samsung", "Asus", "DJI", "Sony", "Logitech"];

    return (
        <div className={cx('container')}>
            {/* Nhóm Category */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Category</span>
                {categories.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="category" value={item} />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Price */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Price Range</span>
                {priceRange.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="priceRange" value={item} />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Brand */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Brand</span>
                {brands.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="brand" value={item} />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SubmenuAdvancedSearch;