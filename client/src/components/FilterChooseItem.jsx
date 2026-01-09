import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/FilterChooseItem.module.scss';


const cx = classNames.bind(styles);
const FilterChooseItem = ({props}) => {

    return (
        <div className={cx('item-wrapper')}>
            <span className={cx("item")}>{props}</span>

        </div>
    );
};

export default FilterChooseItem;