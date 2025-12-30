import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/SubmenuAdvancedSearch.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSubfilterValue} from "../redux/SubfilterSlice.js";

const cx = classNames.bind(styles);

const SubmenuAdvancedSearch = () => {
    const dispatch = useDispatch()
    const listFilters = useSelector(state => state.subfilter.value);

    const categories = ["Laptops", "Audio", "Wearables", "Drones", "PC Components", "Accessories"];
    const priceRange = ["$0-$100", "$101-$500", "$501+"];
    const brands = ["Apple", "Samsung", "Asus", "DJI", "Sony", "Logitech"];

    const [filterChoose, setFilterChoose] = React.useState(listFilters);

    const handleSetValueFilter = (value) =>{
        const newValue = [...filterChoose, value]
        setFilterChoose(newValue);
        dispatch(setSubfilterValue(newValue));
    }

    console.log(filterChoose);
    return (
        <div className={cx('container')}>
            {/* Nhóm Category */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Category</span>
                {categories.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="category" value={item} onClick={()=>handleSetValueFilter(item)} />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Price */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Price Range</span>
                {priceRange.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="priceRange" value={item} onClick={()=>handleSetValueFilter(item)} />
                        {item}
                    </label>
                ))}
            </div>

            {/* Nhóm Brand */}
            <div className={cx("body-menu")}>
                <span className={cx("title")}>Brand</span>
                {brands.map((item, index) => (
                    <label key={index}>
                        <input type="checkbox" name="brand" value={item} onClick={()=>handleSetValueFilter(item)} />
                        {item}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default SubmenuAdvancedSearch;