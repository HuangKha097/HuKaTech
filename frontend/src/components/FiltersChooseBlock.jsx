import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/FiltersChooseBlock.module.scss';
import FilterChooseItem from "./FilterChooseItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeSubfilterValue    } from "../redux/SubfilterSlice.js";

const cx = classNames.bind(styles);
const FiltersChooseBlock = () => {
    const dispatch = useDispatch();
    const listFilters = useSelector((state) => state.subfilter.value);

    const handleRemove = (itemToRemove) => {
        dispatch(removeSubfilterValue(itemToRemove));
    };

    return (
        <div className={cx("container")}>
            <div className={cx("body")}>
                {listFilters.length > 0 && listFilters.map((filter, index) => (
                    <FilterChooseItem onRemove = {()=>handleRemove(filter)} props={filter} key={index} />
                ))

                }

            </div>
        </div>
    );
};

export default FiltersChooseBlock;