import React, {useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/ProductPage.module.scss"
import Slidebar from "../components/Slidebar.jsx";
import Table from "../components/Table.jsx";
import {Link} from "react-router-dom";
const cx = classNames.bind(style);
const Products = () => {
    const [currentPage, setCurrentPage] = useState(0);
    return (
        <div className={cx("container")}>

                <div className={cx("header")}>
                    <div className={cx("block-left")}>
                        <h1>Products Management</h1>
                        <p>Manage your product inventory and catelog</p>
                    </div>
                    <Link to="add-new-product">   <button className={cx("add-btn")}>+ Add Product</button></Link>
                </div>
                <form className={cx("filter-block")}>
                    <label htmlFor="search">
                        Search Products
                        <input type="text" id="search" placeholder="Search by product name..."/>
                    </label>
                    <label htmlFor="select-category">
                        Category
                        <select name="select-category" id="select-category">
                            <option value="">Select Category</option>
                            <option value="allCategory">All Category</option>
                            <option value="smartphones">Smartphones</option>
                            <option value="laptops">Laptops</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </label>
                    <label htmlFor="select-status">
                        Status
                        <select name="select-status" id="select-status">
                            <option value="">Select Status</option>
                            <option value="allStatus">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="lowStock">Low Stock</option>
                            <option value="outOfStock">Out of Stock</option>
                        </select>
                    </label>
                    <button type="submit" className={cx("add-btn", "search-btn")}>Search</button>
                </form>
                <div className={cx("table-block")}>
                    <Table/>
                    <div className={cx("pages-btn")}>
                        <button className={cx( "page-btn", currentPage ===0 && "add-btn")}>1</button>
                        <button className={cx( "page-btn")}>1</button>
                        <button className={cx( "page-btn")}>1</button>
                        <button className={cx( "page-btn")}>&gt;</button>
                    </div>
                </div>
            </div>
    );
};

export default Products;