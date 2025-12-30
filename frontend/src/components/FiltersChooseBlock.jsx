import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/FiltersChooseBlock.module.scss';
import FilterChooseItem from "./FilterChooseItem.jsx";
import {useDispatch, useSelector} from "react-redux";
import {removeSubfilterValue    } from "../redux/SubfilterSlice.js";

const cx = classNames.bind(styles);
const FiltersChooseBlock = () => {

    const listFilters = useSelector((state) => state.subfilter.value);

    return (
        <div className={cx("container")}>
                <span>Filters:</span>
            <div className={cx("body")}>
                {listFilters.length > 0 && listFilters.map((filter, index) => (
                    <FilterChooseItem   props={filter} key={index} />
                ))

                }

            </div>
        </div>
    );
};

export default FiltersChooseBlock;