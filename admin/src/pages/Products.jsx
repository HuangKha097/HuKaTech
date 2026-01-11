import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/ProductPage.module.scss"
import Table from "../components/Table.jsx";
import {Link} from "react-router-dom";
import * as ProductService from "../services/ProductService.js";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../redux/productsSlice.js";

const cx = classNames.bind(style);
const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.list);

    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 8;
    const totalItems = products?.length || 0;
    const pagesCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const currentProducts = products?.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    useEffect(() => {
        if (!products || products.length === 0) {
            setCurrentPage(0);
            return;
        }

        const maxPage = Math.max(
            Math.ceil(products.length / ITEMS_PER_PAGE) - 1,
            0
        );

        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [products, currentPage]);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await ProductService.fetchAllProducts()
                console.log(res.data)
                if (res.status === "OK") {
                    dispatch(setProducts(res.data))
                }
            } catch (e) {
                console.error(e)
            }
        }
        fetchProducts();
    }, [dispatch])

    const handleToggleActive = async (productId) => {
        try {
            const res = await ProductService.handleActiveProduct(productId);

            if (res.status === "OK") {
                const updatedProducts = products.map(item =>
                    item._id === productId
                        ? {...item, status: res.data.status}
                        : item
                );

                dispatch(setProducts(updatedProducts));
                alert("Successfully updated products");
            }
        } catch (error) {
            alert("Failed to fetch the product");
            console.error(error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        const isConfirm = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!isConfirm) return;

        try {
            const res = await ProductService.deleteProduct(productId);

            if (res.status === "OK") {
                dispatch(
                    setProducts(products.filter(item => item._id !== productId))
                );
                alert("Successfully deleted product");
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            alert("Failed to delete product");
            console.error(error);
        }
    };


    return (
        <div className={cx("container")}>

            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Products Management</h1>
                    <p>Manage your product inventory and catelog</p>
                </div>
                <Link to="add-new-product">
                    <button className={cx("add-btn")}>+ Add Product</button>
                </Link>
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
                <Table data={currentProducts} onView={handleToggleActive} onDelete={handleDeleteProduct} />
                <div className={cx("pages-btn")}>
                    {Array.from({length: pagesCount}).map((_, index) => (
                        <button
                            key={index}
                            className={cx(
                                "page-btn",
                                currentPage === index && "active"
                            )}
                            type="button"
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Products;