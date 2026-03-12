import React from "react";
import classNames from "classnames/bind";
import styles from "../assets/css/SubmenuAdvancedSearch.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {setPriceRange, toggleBrand, toggleType} from "../redux/SubfilterSlice";

const cx = classNames.bind(styles);

const SubmenuAdvancedSearch = () => {
    const dispatch = useDispatch();
    const {type, brand, priceRange} = useSelector(
        state => state.subfilter
    );

    const types = [
        "Laptop", "Headphone", "Mouse", "Webcam",
        "KeyBoard", "Watch", "Speaker", "Accessories", "Others"
    ];

    const priceRanges = [
        "< 500,000 đ",
        "500,000 đ - 1,500,000 đ",
        "1,500,001 đ - 3,500,000 đ",
        "> 3,500,000 đ"
    ];

    const brands = [
        "Apple", "Samsung", "Asus", "DJI", "Sony", "Logitech"
    ];

    return (
        <div className={cx("container")}>

            {/* TYPE */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Type</span>
                {types.map(item => (
                    <label key={item}>
                        <input
                            type="checkbox"
                            checked={type.includes(item)}
                            onChange={() => dispatch(toggleType(item.toLowerCase()))}
                        />
                        <span className={cx("item-menu")}>{item}</span>
                    </label>
                ))}
            </div>

            <div className={cx("body-menu")}>
                <span className={cx("title")}>Price Range</span>
                {priceRanges.map(item => (
                    <label key={item}>
                        <input
                            type="radio"
                            name="priceRange"
                            checked={priceRange === item}
                            onChange={() => dispatch(setPriceRange(item))}
                        />
                        <span className={cx("item-menu")}>{item}</span>
                    </label>
                ))}
            </div>

            {/* BRAND */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Brand</span>
                {brands.map(item => (
                    <label key={item}>
                        <input
                            type="checkbox"
                            checked={brand.includes(item)}
                            onChange={() => dispatch(toggleBrand(item.toLowerCase()))}
                        />
                        <span className={cx("item-menu")}>{item}</span>
                    </label>
                ))}
            </div>

        </div>
    );
};

export default SubmenuAdvancedSearch;
