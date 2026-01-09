import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Slidebar.module.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBoxArchive, faCartShopping,
    faChartLine, faChartSimple,
    faFileImport,
    faFolderTree, faGears,
    faTags, faUsers,
    faWarehouse
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


const cx = classNames.bind(styles);
const Slidebar = () => {
    const [isActive, setIsActive] = useState('dashboard');
    return (
        <div className={cx('slidebar-container')}>
            <div className={cx('logo-container')}>
                <img src="../../public/logo.png" alt=""/>
            </div>
            <ul className={cx('slidebar-list')}>
                <Link to={"dashboard"} onClick={()=> setIsActive("dashboard")} className={cx(isActive==="dashboard" && "active", "item-nav")}><FontAwesomeIcon icon={faChartLine} />Dashboard</Link>
                <Link to={"products"}  onClick={()=> setIsActive("products")} className={cx(isActive==="products" && "active", "item-nav")}><FontAwesomeIcon icon={faBoxArchive} />Products</Link>
                <Link to={"imports"}  onClick={()=> setIsActive("imports")} className={cx(isActive==="imports" && "active", "item-nav")}><FontAwesomeIcon icon={faFileImport} />Imports</Link>
                <Link to={"price&profit"}  onClick={()=> setIsActive("price&profit")} className={cx(isActive==="price&profit" && "active", "item-nav")}><FontAwesomeIcon icon={faTags} />Price & Profit</Link>
                <Link to={"inventory"}  onClick={()=> setIsActive("inventory")} className={cx(isActive==="inventory" && "active", "item-nav")}><FontAwesomeIcon icon={faWarehouse} />Inventory</Link>
                <Link to={"categories"}  onClick={()=> setIsActive("categories")} className={cx(isActive==="categories" && "active", "item-nav")}><FontAwesomeIcon icon={faFolderTree} />Categories</Link>
                <Link to={"orders"}  onClick={()=> setIsActive("orders")} className={cx(isActive==="orders" && "active", "item-nav")}><FontAwesomeIcon icon={faCartShopping} />Orders</Link>
                <Link to={"customers"}  onClick={()=> setIsActive("customers")} className={cx(isActive==="customers" && "active", "item-nav")}><FontAwesomeIcon icon={faUsers} />Customers</Link>
                <Link to={"sales&reports"}  onClick={()=> setIsActive("sales&reports")} className={cx(isActive==="sales&reports" && "active", "item-nav")}><FontAwesomeIcon icon={faChartSimple} />Sales Reports</Link>
                <Link to={"setting"}  onClick={()=> setIsActive("setting")} className={cx(isActive==="setting" && "active", "item-nav")}><FontAwesomeIcon icon={faGears} />Setting</Link>
            </ul>
        </div>
    );
};

export default Slidebar;