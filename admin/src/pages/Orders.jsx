import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/ProductPage.module.scss"
import Table from "../components/Table.jsx";
import {Link} from "react-router-dom";
import * as ProductService from "../services/ProductService.js";
import {useDispatch, useSelector} from "react-redux";
import {setProducts} from "../redux/productsSlice.js";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);
const Orders = () => {
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

    const [payloadSearch, setPayloadSearch] = useState({
        name: '',
        type: '',
        status: ''
    });
    const [isShowBackBtn, setIsShowBackBtn] = useState(false);

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
                alert(res.message)
            }
        } catch (error) {

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

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setPayloadSearch((prevState) => ({...prevState, [name]: value}));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(payloadSearch);

        try {
            const res = await ProductService.advancedSearchProductAdmin(payloadSearch);
            if (res.status === "OK") {
                dispatch(setProducts(res.data))
                setIsShowBackBtn(true);
            }
        } catch (error) {
            alert("Cần ít nhất một trường dữ liệu để tìm kiếm")
            console.error(error);
        }
    }
    const handleBack = async () => {

        setPayloadSearch({
            name: '',
            type: '',
            status: ''
        });

        setIsShowBackBtn(false);
        setCurrentPage(0);

        try {
            const res = await ProductService.fetchAllProducts();
            if (res.status === "OK") {
                dispatch(setProducts(res.data));
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className={cx("container")}>

            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Orders Management</h1>
                    <p>Track, process and manage customer orders</p>
                </div>
            </div>

            <form className={cx("filter-block")} onSubmit={handleSubmit}>
                <label>
                    Order / Customer
                    <input
                        type="text"
                        name="name"
                        value={payloadSearch.name}
                        onChange={handleChangeInput}
                        placeholder="Search by order ID or customer..."
                    />
                </label>

                <label>
                    Payment Method
                    <select name="type" value={payloadSearch.type} onChange={handleChangeInput}>
                        <option value="">All methods</option>
                        <option value="cod">COD</option>
                        <option value="paypal">Paypal</option>
                        <option value="bank">Bank Transfer</option>
                    </select>
                </label>

                <label>
                    Order Status
                    <select name="status" value={payloadSearch.status} onChange={handleChangeInput}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="shipping">Shipping</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </label>

                <button type="submit" className={cx("add-btn", "search-btn")}>
                    Search
                </button>
            </form>

            <div className={cx("table-block")}>
                <Table
                    data={currentProducts}
                    onView={handleToggleActive}   // sau này đổi thành updateStatus
                    onDelete={handleDeleteProduct} // sau này có thể disable
                />

                <div className={cx("footer-btn")}>
                    {isShowBackBtn && (
                        <button
                            className={cx("back-btn")}
                            type="button"
                            onClick={handleBack}
                        >
                            <FontAwesomeIcon icon={faArrowLeft}/>
                            Back to all orders
                        </button>
                    )}

                    <div className={cx("pages-btn")}>
                        {Array.from({ length: pagesCount }).map((_, index) => (
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

        </div>
    );
};

export default Orders;