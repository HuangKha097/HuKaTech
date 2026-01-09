import React, {useEffect} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/SubmenuAdvancedSearch.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {removeSubfilterValue, setSubfilterValue} from "../redux/SubfilterSlice.js";

const cx = classNames.bind(styles);

const SubmenuAdvancedSearch = () => {
    const dispatch = useDispatch()
    const listFilters = useSelector(state => state.subfilter.value);

    const categories = ["Laptops", "Audio", "Wearables", "Drones", "PC/Components", "Accessories"];
    const priceRange = ["$0-$100", "$101-$500", "$501+"];
    const brands = ["Apple", "Samsung", "Asus", "DJI", "Sony", "Logitech"];



    const handleSetValueFilter = (value) =>{
        const newValue = [...listFilters, value]
        if(listFilters.includes(value)){
            dispatch(removeSubfilterValue(value))
        }else {
            dispatch(setSubfilterValue(newValue));
        }
    }

    console.log("list:",listFilters);
    return (
        <div className={cx('container')}>
            {/* Nhóm Category */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Category</span>
                {categories.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox"  name="category" checked={listFilters.includes(item)} value={item} onClick={()=>handleSetValueFilter(item)} />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Price */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Price Range</span>
                {priceRange.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="priceRange" checked={listFilters.includes(item)} value={item} onClick={()=>handleSetValueFilter(item)} />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Brand */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Brand</span>
                {brands.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="brand" checked={listFilters.includes(item)} value={item} onClick={()=>handleSetValueFilter(item)} />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SubmenuAdvancedSearch;