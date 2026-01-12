import React, { useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../assets/css/NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faMagnifyingGlass,
    faSortDown
} from "@fortawesome/free-solid-svg-icons";
import Submenu from "./Submenu";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/images";
import SubmenuAdvancedSearch from "./SubmenuAdvancedSearch.jsx";
import FiltersChooseBlock from "./FiltersChooseBlock.jsx";
import { useDispatch, useSelector } from "react-redux";
import {clearSubfilter, setProductsSearch} from "../redux/SubfilterSlice.js";
import * as ProductService from "../services/ProductService.js";

const cx = classNames.bind(styles);

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productsCart = useSelector((state) => state.cart.products);
    const { type, brand, priceRange } = useSelector(
        (state) => state.subfilter
    );

    const [activeMenu, setActiveMenu] = useState("");
    const [valueSearch, setValueSearch] = useState("");

    const timeoutRef = useRef(null);

    const hasFilters =
        type.length > 0 || brand.length > 0 || !!priceRange;

    const handleSearch = async () => {
        try {
            if (
                !valueSearch.trim() &&
                type.length === 0 &&
                brand.length === 0 &&
                !priceRange
            ) {
                return;
            }

            const payload = {
                name: valueSearch.trim() || undefined,
                type,
                brand,
                priceRange
            };
            console.log(payload)

            const res = await ProductService.advancedSearchProductClient(payload);

            console.log(res);

            if (res.status === "OK") {
                dispatch(setProductsSearch(res.data));
                navigate("/search");
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };



    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
            dispatch(clearSubfilter());
        }
    };


    const handleMouseEnterPopUp = (value) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(value);
    };

    const handleMouseLeavePopUp = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMenu("");
        }, 300);
    };

    return (
        <div className={cx("container")}>
            {/* LOGO */}
            <div className={cx("logo")}>
                <Link to="/">
                    <img src={logo} alt="logo shop" />
                </Link>
            </div>

            {/* SEARCH */}
            <label htmlFor="search" className={cx("search")}>
                <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faMagnifyingGlass}
                />
                <input
                    id="search"
                    type="text"
                    placeholder="Search gadgets, devices"
                    value={valueSearch}
                    onChange={(e) => setValueSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {/* FILTER */}
                <div
                    className={cx("filter-wrapper")}
                    onMouseEnter={() =>
                        handleMouseEnterPopUp("advanced-menu")
                    }
                    onMouseLeave={handleMouseLeavePopUp}
                >
                    <button className={cx("filter-btn")}>
                        Filters <FontAwesomeIcon icon={faSortDown} />
                    </button>

                    <div
                        className={cx("submenu-advanced-search", {
                            isOpen: activeMenu === "advanced-menu"
                        })}
                    >
                        <SubmenuAdvancedSearch />
                    </div>
                </div>

                {/* FILTERS CHOSEN */}
                {hasFilters && (
                    <div className={cx("filters-choose-block")}>
                        <FiltersChooseBlock />
                    </div>
                )}
            </label>

            {/* NAV LINKS */}
            <ul className={cx("hotlinks")}>
                <li>
                    <div
                        className={cx("menuWrapper")}
                        onMouseEnter={() =>
                            handleMouseEnterPopUp("sub-menu")
                        }
                        onMouseLeave={handleMouseLeavePopUp}
                    >
                        Category
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M12 15L7 10H17L12 15Z"
                                fill="#FAFAFA"
                            />
                        </svg>
                        <div
                            className={cx("submenu", {
                                isOpen: activeMenu === "sub-menu"
                            })}
                        >
                            <Submenu />
                        </div>
                    </div>
                </li>

                <Link to="/about">
                    <li>About</li>
                </Link>

                <li>FAQ</li>

                <Link to="/checkout">
                    <li className={cx("check-out-li")}>
                        Checkout{" "}
                        <FontAwesomeIcon
                            className={cx("cart-icon")}
                            icon={faCartShopping}
                        />
                        <div className={cx("count-products-cart")}>
                            {productsCart.length > 0
                                ? productsCart.reduce(
                                    (t, c) => t + c.quantity,
                                    0
                                )
                                : 0}
                        </div>
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default NavBar;
