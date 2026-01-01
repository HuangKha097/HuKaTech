import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/NavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping, faMagnifyingGlass, faSortDown} from '@fortawesome/free-solid-svg-icons';
import Submenu from './Submenu';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../assets/images/index';
import SubmenuAdvancedSearch from "./SubmenuAdvancedSearch.jsx";
import FiltersChooseBlock from "./FiltersChooseBlock.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearSubfilterValue} from "../redux/SubfilterSlice.js";
import {clearSubmenuValue} from "../redux/SubmenuSlice.js";

const cx = classNames.bind(styles);

const NavBar = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const productsCart = useSelector(state => state.cart.products);
    const listFilters = useSelector(state => state.subfilter.value)
    const [isSubmenuAdvancedSearch, setIsSubmenuAdvancedSearch] = useState(false);
    const [isSubmenu, setIsSubmenu] = useState(false);
    const [valueSearch, setValueSerch] = useState('');

    // Dùng useRef để quản lý timeout, tránh lỗi đóng mở chập chờn
    const timeoutRef = useRef(null);

    const handleSearch = () => {
        if (valueSearch) {
            navigate(`/search/${valueSearch}`);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
            dispatch(clearSubfilterValue());

        }
    };

    // Xử lý hover cho phần Advanced Search
    const handleMouseEnterAdvanced = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsSubmenuAdvancedSearch(true);
    };

    const handleMouseLeaveAdvanced = () => {
        timeoutRef.current = setTimeout(() => {
            setIsSubmenuAdvancedSearch(false);
        }, 300); // Đợi 300ms mới đóng
    };

    return (
        <div className={cx('container')}>
            <div className={cx('logo')}>
                <Link to={'/'}>
                    <img src={logo} alt="logo shop" />
                </Link>
            </div>

            <label htmlFor="search" className={cx('search')}>
                <FontAwesomeIcon className={cx('icon')} icon={faMagnifyingGlass} />
                <input
                    name="search"
                    type="text"
                    id="search"
                    placeholder="Search gadgets, devices"
                    value={valueSearch}
                    onChange={(e) => setValueSerch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <div
                    className={cx('filter-wrapper')}
                    onMouseEnter={handleMouseEnterAdvanced}
                    onMouseLeave={handleMouseLeaveAdvanced}
                >
                    <button className={cx("filter-btn")}>
                        Filters <FontAwesomeIcon icon={faSortDown} />
                    </button>

                    <div className={cx('submenu-advanced-search', { isOpen: isSubmenuAdvancedSearch })}>
                        <SubmenuAdvancedSearch />
                    </div>
                </div>
                { listFilters.length > 0 && <div className={cx("filters-choose-block")}>
                    <FiltersChooseBlock/>
                </div>}
            </label>

            <ul className={cx('hotlinks')}>
                <li>
                    <div
                        className={cx('menuWrapper')}
                        onMouseEnter={() => setIsSubmenu(true)}
                        onMouseLeave={() => setTimeout(() => setIsSubmenu(false), 300)}
                    >
                        Category
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 15L7 10H17L12 15Z" fill="#FAFAFA" />
                        </svg>
                        <div className={cx('submenu', { isOpen: isSubmenu })}>
                            <Submenu />
                        </div>
                    </div>
                </li>
                <Link to={'/about'}><li>About</li></Link>
                <li>FAQ</li>
                <Link to={'/checkout'}><li className={cx("check-out-li")}>Checkout <FontAwesomeIcon className={cx("cart-icon")} icon={faCartShopping} /> <div className={cx("count-products-cart")}>{productsCart.length}</div></li></Link>
               <Link to={'/login'}> <li className={cx("signin-li")}>Sign In</li></Link>
            </ul>
        </div>
    );
};

export default NavBar;