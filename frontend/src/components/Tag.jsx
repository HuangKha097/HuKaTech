import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Tag.module.scss';

const cx = classNames.bind(styles);
const Tag = ({ props }) => {
    return (
        <div className={cx('container')}>
            <span>{props}</span>
        </div>
    );
};

export default Tag;
