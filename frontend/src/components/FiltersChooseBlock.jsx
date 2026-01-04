import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/FiltersChooseBlock.module.scss';
import FilterChooseItem from "./FilterChooseItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearSubfilterValue} from "../redux/SubfilterSlice.js";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);
const FiltersChooseBlock = () => {

    const dispatch = useDispatch();
    const listFilters = useSelector((state) => state.subfilter.value);

    const handleRemoveAllFilter = () => {
        dispatch(clearSubfilterValue());
    }

    return (
        <div className={cx("container")}>
                <span>Filters:</span>
            <div className={cx("body")}>
                {listFilters.length > 0 && listFilters.map((filter, index) => (
                    <FilterChooseItem   props={filter} key={index} />
                ))
                }
            </div>
            <button className={cx("clear-all")} onClick={handleRemoveAllFilter} ><FontAwesomeIcon icon={faCircleXmark} /></button>
        </div>
    );
};

export default FiltersChooseBlock;