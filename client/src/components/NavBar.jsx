import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "../assets/css/NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faCartShopping, faMagnifyingGlass, faSortDown, faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import Submenu from "./Submenu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logo } from "../assets/images";
import SubmenuAdvancedSearch from "./SubmenuAdvancedSearch.jsx";
import FiltersChooseBlock from "./FiltersChooseBlock.jsx";
import { useDispatch, useSelector } from "react-redux";
import { clearSubfilter, setProductsSearch } from "../redux/SubfilterSlice.js";
import * as ProductService from "../services/ProductService.js";
import * as CategoryService from "../services/CategoryService.js"
import { setCategories } from "../redux/CategorySlice.js";

const cx = classNames.bind(styles);

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const productsCart = useSelector((state) => state.cart.products);
    const { type, brand, priceRange } = useSelector(
        (state) => state.subfilter
    );

    const [activeMenu, setActiveMenu] = useState("");
    const [valueSearch, setValueSearch] = useState("");

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        setIsMenuOpen(false);
        setActiveMenu("");
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            if (!event.target.closest(`.${styles['filter-wrapper']}`) && !event.target.closest(`.${styles['menuWrapper']}`)) {
                setActiveMenu("");
            }
        };

        if (isMenuOpen || activeMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen, activeMenu]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const timeoutRef = useRef(null);

    const hasFilters =
        type.length > 0 || brand.length > 0 || !!priceRange;

    const [hideNav, setHideNav] = useState(false);
    const lastScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll > lastScroll.current && currentScroll > 250) {
                setHideNav(true);
            } else {
                setHideNav(false);
            }

            lastScroll.current = currentScroll;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const getActiveCategories = async () => {
            try {
                const result = await CategoryService.getActiceCategories();


                if (result?.status === "SUCCESS") {
                    console.log("Categories getActiveCategories", result?.data);
                    dispatch(setCategories(result?.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getActiveCategories();
    }, []);

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
                setIsMenuOpen(false);
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

    const handleTogglePopUp = (value, e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveMenu(activeMenu === value ? "" : value);
    };

    const renderSearch = (isMobileClassName) => (
        <label htmlFor={`search-${isMobileClassName}`} className={cx("search", isMobileClassName)}>
            <FontAwesomeIcon
                className={cx("icon")}
                icon={faMagnifyingGlass}
                onClick={handleSearch}
            />
            <input
                id={`search-${isMobileClassName}`}
                type="text"
                placeholder="Search gadgets, devices"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            <div
                className={cx("filter-wrapper", { active: activeMenu === "advanced-menu" })}
                onMouseEnter={() => handleMouseEnterPopUp("advanced-menu")}
                onMouseLeave={handleMouseLeavePopUp}
            >
                <button className={cx("filter-btn")} onClick={(e) => handleTogglePopUp("advanced-menu", e)}>
                    Filters <FontAwesomeIcon icon={faSortDown} />
                </button>

                <div className={cx("submenu-advanced-search")}>
                    <SubmenuAdvancedSearch />
                </div>
            </div>

            {hasFilters && (
                <div className={cx("filters-choose-block")}>
                    <FiltersChooseBlock />
                </div>
            )}
        </label>
    );

    return (
        <div ref={menuRef} className={cx("container", { hide: hideNav })}>

            <div className={cx("logo")}>
                <img
                    src={logo}
                    onClick={() => window.location.href = "/"}
                    alt="logo shop"
                    style={{ cursor: "pointer" }}
                />
            </div>


            {renderSearch("desktop-search")}
            <button className={cx('menu-toggle-btn')} onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
            </button>
            <ul className={cx("hotlinks", { open: isMenuOpen })}>
                <li className={cx("mobile-search-container")}>
                    {renderSearch("mobile-search")}
                </li>
                <li>
                    <div
                        className={cx("menuWrapper", { active: activeMenu === "sub-menu" })}
                        onMouseEnter={() =>
                            handleMouseEnterPopUp("sub-menu")
                        }
                        onMouseLeave={handleMouseLeavePopUp}
                        onClick={(e) => handleTogglePopUp("sub-menu", e)}
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
                            className={cx("submenu")}
                        >
                            <Submenu />
                        </div>
                    </div>
                </li>

                <Link to="/about">
                    <li>About</li>
                </Link>

                <Link to="/faq">
                    <li>FAQ</li>
                </Link>


                <Link to="/checkout">
                    <li className={cx("check-out-li")}>
                        Checkout{" "}
                        <FontAwesomeIcon

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
                <Link to="/login">
                    <li className={cx("check-out-li")}>
                        Login
                        <FontAwesomeIcon   icon={faArrowRightToBracket} />
                    </li>
                </Link>
            </ul>
        </div>
    );
};

export default NavBar;
