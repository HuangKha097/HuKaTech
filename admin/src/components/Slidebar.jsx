import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Slidebar.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBoxArchive,
    faCartShopping,
    faChartLine,
    faChartSimple,
    faFileImport,
    faFolderTree,
    faGears,
    faTags,
    faUsers,
    faWarehouse
} from "@fortawesome/free-solid-svg-icons";
import {Link, useLocation} from "react-router-dom";

const cx = classNames.bind(styles);
const Slidebar = () => {
    const location = useLocation();

    return (
        <div className={cx('slidebar-container')}>
            <div className={cx('logo-container')}>
                <img src="../../public/logo.png" alt=""/>
            </div>
            <ul className={cx('slidebar-list')}>
                <Link to={"dashboard"}
                      className={cx(location.pathname  === "/dashboard" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faChartLine}/>Dashboard</Link>
                <Link to={"products"} className={cx(location.pathname  === "/products" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faBoxArchive}/>Products</Link>
                <Link to={"imports"} className={cx(location.pathname  === "/imports" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faFileImport}/>Imports</Link>
                <Link to={"price&profit"}
                      className={cx(location.pathname  === "/price&profit" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faTags}/>Price & Profit</Link>
                <Link to={"inventory"}
                      className={cx(location.pathname  === "/inventory" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faWarehouse}/>Inventory</Link>
                <Link to={"categories"}
                      className={cx(location.pathname  === "/categories" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faFolderTree}/>Categories</Link>
                <Link to={"orders"} className={cx(location.pathname  === "/orders" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faCartShopping}/>Orders</Link>
                <Link to={"customers"}
                      className={cx(location.pathname  === "/customers" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faUsers}/>Customers</Link>
                <Link to={"sales&reports"}
                      className={cx(location.pathname  === "/sales&reports" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faChartSimple}/>Sales Reports</Link>
                <Link to={"setting"} className={cx(location.pathname  === "/setting" && "active", "item-nav")}><FontAwesomeIcon
                    icon={faGears}/>Setting</Link>
            </ul>
        </div>
    );
};

export default Slidebar;