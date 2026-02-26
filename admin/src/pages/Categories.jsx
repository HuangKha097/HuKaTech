import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/CategoryPage.module.scss";
import { Link } from "react-router-dom";
import { faArrowLeft, faEdit, faTrash, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);

// 📦 MẢNG DỮ LIỆU CỨNG (Không có image)
const DUMMY_CATEGORIES = [
    {
        _id: "cat_1",
        name: "Laptop",
        description: "High-performance laptops for gaming and productivity.",
        status: "active"
    },
    {
        _id: "cat_2",
        name: "Smartphones",
        description: "Latest mobile devices from top brands.",
        status: "active"
    },
    {
        _id: "cat_3",
        name: "Headphones",
        description: "Noise-cancelling and wireless audio devices.",
        status: "inactive"
    },
    {
        _id: "cat_4",
        name: "Keyboards",
        description: "Mechanical keyboards for typing enthusiasts.",
        status: "active"
    },
    {
        _id: "cat_5",
        name: "Monitors",
        description: "4K and Ultrawide displays.",
        status: "active"
    }
];

const CategoryPage = () => {
    // Sử dụng Local State để test UI thay vì Redux
    const [categories, setCategories] = useState(DUMMY_CATEGORIES);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 8;
    const totalItems = categories?.length || 0;
    const pagesCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const currentCategories = categories?.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const [payloadSearch, setPayloadSearch] = useState({
        name: '',
        status: ''
    });
    const [isShowBackBtn, setIsShowBackBtn] = useState(false);

    // Xử lý lỗi phân trang
    useEffect(() => {
        if (!categories || categories.length === 0) {
            setCurrentPage(0);
            return;
        }
        const maxPage = Math.max(Math.ceil(categories.length / ITEMS_PER_PAGE) - 1, 0);
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [categories, currentPage]);

    // 🔄 MOCK: Đổi trạng thái Active/Inactive
    const handleToggleActive = (categoryId) => {
        const updatedCategories = categories.map(item =>
            item._id === categoryId
                ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' }
                : item
        );
        setCategories(updatedCategories);
    };

    // 🗑️ MOCK: Xóa Category
    const handleDeleteCategory = (categoryId) => {
        const isConfirm = window.confirm("Are you sure you want to delete this category?");
        if (!isConfirm) return;

        setCategories(categories.filter(item => item._id !== categoryId));
        alert("Successfully deleted category");
    };

    // Input change cho bộ lọc
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setPayloadSearch((prevState) => ({ ...prevState, [name]: value }));
    };

    // 🔍 MOCK: Submit bộ lọc tìm kiếm
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!payloadSearch.name && !payloadSearch.status) {
            return alert("Please enter at least one field to search");
        }

        setIsLoading(true);
        setTimeout(() => {
            // Lọc dữ liệu cứng dựa trên từ khóa và status
            const filtered = DUMMY_CATEGORIES.filter(cat => {
                const matchName = cat.name.toLowerCase().includes(payloadSearch.name.toLowerCase());
                const matchStatus = payloadSearch.status ? cat.status === payloadSearch.status : true;
                return matchName && matchStatus;
            });

            setCategories(filtered);
            setIsShowBackBtn(true);
            setCurrentPage(0);
            setIsLoading(false);
        }, 500); // Giả lập độ trễ API 0.5s
    };

    // 🔙 MOCK: Nút quay lại sau khi tìm kiếm
    const handleBack = () => {
        setPayloadSearch({ name: '', status: '' });
        setIsShowBackBtn(false);
        setCurrentPage(0);
        setIsLoading(true);

        setTimeout(() => {
            setCategories(DUMMY_CATEGORIES);
            setIsLoading(false);
        }, 300);
    };

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Categories Management</h1>
                    <p>Manage your product categories</p>
                </div>
                <Link to="add-new-category">
                    <button className={cx("add-btn")}>+ Add Category</button>
                </Link>
            </div>

            {/* Bộ lọc tìm kiếm */}
            <form className={cx("filter-block")} onSubmit={handleSubmit}>
                <label htmlFor="search">
                    Search Categories
                    <input
                        type="text"
                        id="search"
                        name="name"
                        value={payloadSearch.name}
                        onChange={handleChangeInput}
                        placeholder="Search by category name..."
                    />
                </label>

                <label htmlFor="select-status">
                    Status
                    <select name="status" value={payloadSearch.status} id="select-status" onChange={handleChangeInput}>
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </label>
                <button type="submit" className={cx("add-btn", "search-btn")}>Search</button>
            </form>

            {/* Khu vực hiển thị Cards */}
            {isLoading ? (
                <div className={cx("loading")}>Loading categories...</div>
            ) : (
                <div className={cx("cards-grid")}>
                    {currentCategories?.map(category => (
                        <div key={category._id} className={cx("category-card")}>

                            <div className={cx("card-content")}>
                                <div className={cx("card-header")}>
                                    <h3 className={cx("card-title")}>{category.name}</h3>
                                    <span className={cx("status-badge", category.status)}>
                                        {category.status}
                                    </span>
                                </div>
                                <p className={cx("card-desc")}>
                                    {category.description || "No description provided."}
                                </p>
                            </div>

                            <div className={cx("card-actions")}>
                                <button
                                    className={cx("action-btn", "toggle-btn")}
                                    onClick={() => handleToggleActive(category._id)}
                                    title={category.status === 'active' ? 'Deactivate' : 'Activate'}
                                >
                                    <FontAwesomeIcon icon={category.status === 'active' ? faEyeSlash : faEye} />
                                </button>

                                <Link to={`edit-category/${category._id}`}>
                                    <button className={cx("action-btn", "edit-btn")} title="Edit">
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </Link>

                                <button
                                    className={cx("action-btn", "delete-btn")}
                                    onClick={() => handleDeleteCategory(category._id)}
                                    title="Delete"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Phân trang & Nút Back */}
            <div className={cx("footer-btn")}>
                {isShowBackBtn && (
                    <button className={cx("back-btn")} type="button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to all categories
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

export default CategoryPage;