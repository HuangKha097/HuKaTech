import React from "react";
import classNames from "classnames/bind";
import styles from "../assets/css/FiltersChooseBlock.module.scss";
import FilterChooseItem from "./FilterChooseItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearSubfilter } from "../redux/SubfilterSlice.js";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const FiltersChooseBlock = () => {
    const dispatch = useDispatch();

    const { type, brand, priceRange } = useSelector(
        (state) => state.subfilter
    );


    const selectedFilters = [
        ...type,
        ...brand,
        ...(priceRange ? [priceRange] : [])
    ];

    const handleRemoveAllFilter = () => {
        dispatch(clearSubfilter());
    };

    if (selectedFilters.length === 0) return null;

    return (
        <div className={cx("container")}>
            <span>Filters:</span>

            <div className={cx("body")}>
                {selectedFilters.map((filter, index) => (
                    <FilterChooseItem key={index} props={filter} />
                ))}
            </div>

            <button
                className={cx("clear-all")}
                onClick={handleRemoveAllFilter}
            >
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
        </div>
    );
};

export default FiltersChooseBlock;
