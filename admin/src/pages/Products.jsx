import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/ProductPage.module.scss";
import tableStyle from "../assets/css/Table.module.scss";
import Table from "../components/Table.jsx";
import { Link, useNavigate } from "react-router-dom";
import * as ProductService from "../services/ProductService.js";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setProductsEdit } from "../redux/productsSlice.js";
import { faArrowLeft, faEye, faEyeSlash, faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);
const cxTable = classNames.bind(tableStyle);
const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector(state => state.products.list);

    const [isLoading, setIsLoading] = useState(false);
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
        const maxPage = Math.max(Math.ceil(products.length / ITEMS_PER_PAGE) - 1, 0);
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [products, currentPage]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const res = await ProductService.fetchAllProducts();
                if (res.status === "OK") {
                    dispatch(setProducts(res.data));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [dispatch]);

    // --- CÁC HÀM XỬ LÝ (HANDLERS) ---
    const getProductImage = (item) => {
        if (item.images?.length && item.images[0].url) {
            return item.images[0].url;
        }
        return 'https://via.placeholder.com/60';
    };

    const handleToggleActive = async (productId) => {
        try {
            const res = await ProductService.handleActiveProduct(productId);
            if (res.status === "OK") {
                const updatedProducts = products.map(item =>
                    item._id === productId ? { ...item, status: res.data.status } : item
                );
                dispatch(setProducts(updatedProducts));
                alert(res.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        const isConfirm = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirm) return;
        try {
            const res = await ProductService.deleteProduct(productId);
            if (res.status === "OK") {
                dispatch(setProducts(products.filter(item => item._id !== productId)));
                alert("Successfully deleted product");
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            alert("Failed to delete product");
            console.error(error);
        }
    };

    const handleGetProductUpdate = async (product) => {
        try {
            const res = await ProductService.getProductById(product._id);
            if (res.status === "OK" && res.message === "SUCCESS") {
                dispatch(setProductsEdit(res.data));
                navigate(`/products/edit-product/${product._id}`);
            } else {
                alert("Error occurred while getting products");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setPayloadSearch((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await ProductService.advancedSearchProductAdmin(payloadSearch);
            if (res.status === "OK") {
                dispatch(setProducts(res.data));
                setIsShowBackBtn(true);
                setCurrentPage(0);
            }
        } catch (error) {
            alert("Cần ít nhất một trường dữ liệu để tìm kiếm");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = async () => {
        setPayloadSearch({ name: '', type: '', status: '' });
        setIsShowBackBtn(false);
        setCurrentPage(0);
        try {
            setIsLoading(true);
            const res = await ProductService.fetchAllProducts();
            if (res.status === "OK") {
                dispatch(setProducts(res.data));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // --- CẤU HÌNH CỘT CHO BẢNG SẢN PHẨM ---
    const productColumns = [
        {
            header: 'Image',
            className: 'imageCol',
            render: (item) => <img src={getProductImage(item)} alt={item.name} className={cxTable('productImage')} />
        },
        {
            header: 'Name',
            className: 'nameCol',
            render: (item) => <div className={cxTable('textClamp', 'nameText')}>{item.name}</div>
        },
        {
            header: 'Description',
            className: 'descCol',
            render: (item) => <div className={cxTable('textClamp', 'descText')}>{item.description || '-'}</div>
        },
        { header: 'Old Price', accessor: 'oldPrice', className: 'priceCol', tdClassName: 'priceText' },
        {
            header: 'New Price',
            className: 'priceCol',
            tdClassName: 'priceText',
            render: (item) => `${item.newPrice?.toLocaleString()} đ`
        },
        { header: 'Stock', accessor: 'countInStock', className: 'stockCol', tdClassName: 'centerText' },
        { header: 'Category', accessor: 'category', className: 'categoryCol' },
        {
            header: 'Action',
            className: 'actionCol',
            render: (item) => (
                <div className={cxTable('actionGroup')}>
                    <button
                        className={cxTable('actionBtn', 'viewBtn')}
                        title={item.status === "inactive" ? "Bỏ ẩn" : "Ẩn sản phẩm"}
                        onClick={() => handleToggleActive(item._id)}
                    >
                        <FontAwesomeIcon icon={item.status === "inactive" ? faEyeSlash : faEye} />
                    </button>
                    <button
                        className={cxTable('actionBtn', 'editBtn')}
                        title="Sửa"
                        onClick={() => handleGetProductUpdate(item)}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                        className={cxTable('actionBtn', 'deleteBtn')}
                        title="Xóa"
                        onClick={() => handleDeleteProduct(item._id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Products Management</h1>
                    <p>Manage your product inventory and catalog</p>
                </div>
                <Link to="add-new-product">
                    <button className={cx("add-btn")}>+ Add Product</button>
                </Link>
            </div>

            <form className={cx("filter-block")} onSubmit={handleSubmit}>
                <label htmlFor="search">
                    Search Products
                    <input type="text" id="search" name="name" value={payloadSearch.name} onChange={handleChangeInput} placeholder="Search by product name..." />
                </label>
                <label htmlFor="type">
                    Type
                    <select name="type" id="type" onChange={handleChangeInput} value={payloadSearch.type}>
                        <option value="">Select type</option>
                        <option value="laptop">Laptop</option>
                        <option value="mouse">Mouse</option>
                        <option value="webcam">Webcam</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="watch">Watch</option>
                        <option value="speaker">Speaker</option>
                        <option value="headphone">Headphone</option>
                        <option value="accessories">Accessories</option>
                        <option value="others">Others</option>
                    </select>
                </label>
                <label htmlFor="select-status">
                    Status
                    <select name="status" value={payloadSearch.status} id="select-status" onChange={handleChangeInput}>
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="lowStock">Low Stock</option>
                        <option value="outOfStock">Out of Stock</option>
                    </select>
                </label>
                <button type="submit" className={cx("add-btn", "search-btn")}>Search</button>
            </form>

            <div className={cx("table-block")}>
                <Table columns={productColumns} data={currentProducts} loading={isLoading} />
            </div>

            <div className={cx("footer-btn")}>
                {isShowBackBtn && (
                    <button className={cx("back-btn")} type="button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back to all products
                    </button>
                )}
                <div className={cx("pages-btn")}>
                    {Array.from({ length: pagesCount }).map((_, index) => (
                        <button
                            key={index}
                            className={cx("page-btn", currentPage === index && "active")}
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