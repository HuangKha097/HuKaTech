import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/CategoryPage.module.scss";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Popup from "../components/Popup";
import CategoryCard from '../components/CategoryCard.jsx';

// Import Redux & API Services
import {useDispatch, useSelector} from 'react-redux';
import {setCategories, setCategoryEdit} from '../redux/categorySlice.js';
import {deleteCategory, getAllCategories, searchCategories, updateCategory, addNewCategory} from '../services/CategoryService.js';

const cx = classNames.bind(style);

const CategoryPage = () => {
    const dispatch = useDispatch();

    // Lấy state từ Redux
    const categories = useSelector((state) => state.categories.list) || [];
    const categoryEdit = useSelector((state) => state.categories.categoryEdit);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [popupType, setPopupType] = useState(null);
    const [isShowBackBtn, setIsShowBackBtn] = useState(false);
    const [payloadSearch, setPayloadSearch] = useState({name: '', status: ''});

    const ITEMS_PER_PAGE = 8;
    const totalItems = categories.length;
    const pagesCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const currentCategories = categories.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    // Xử lý lỗi phân trang
    useEffect(() => {
        if (categories.length === 0) {
            setCurrentPage(0);
            return;
        }
        const maxPage = Math.max(Math.ceil(categories.length / ITEMS_PER_PAGE) - 1, 0);
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [categories, currentPage]);

    // Lấy dữ liệu lần đầu
    const fetchCategoriesData = async () => {
        setIsLoading(true);
        try {
            const res = await getAllCategories();
            if (res.status === "SUCCESS" || res.success) {
                dispatch(setCategories(res.data));
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoriesData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleToggleActive = async (category) => {
        const newStatus = category.status === 'active' ? 'inactive' : 'active';
        try {
            // Giả sử API update nhận object chứa status mới
            const res = await updateCategory(category._id, {status: newStatus});
            if (res.status === "SUCCESS" || res.success) {
                // Fetch lại list hoặc update local redux state để tối ưu
                fetchCategoriesData();
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleEditCategory = (category) => {
        dispatch(setCategoryEdit(category)); // Lưu thông tin category vào Redux để Popup dùng
        setPopupType("edit");
    };

    const handleDeleteCategory = async (categoryId) => {
        const isConfirm = window.confirm("Are you sure you want to delete this category?");
        if (!isConfirm) return;

        try {
            const res = await deleteCategory(categoryId);
            if (res.status === "SUCCESS" || res.success) {
                alert("Successfully deleted category");
                fetchCategoriesData(); // Load lại data sau khi xóa
            } else {
                alert(res.message || "Delete failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setPayloadSearch((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        if (!payloadSearch.name && !payloadSearch.status) {
            return alert("Please enter at least one field to search");
        }

        setIsLoading(true);
        try {
            const res = await searchCategories(payloadSearch);
            if (res.status === "SUCCESS" || res.success) {
                dispatch(setCategories(res.data));
                setIsShowBackBtn(true);
                setCurrentPage(0);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setPayloadSearch({name: '', status: ''});
        setIsShowBackBtn(false);
        setCurrentPage(0);
        fetchCategoriesData(); // Gọi lại API lấy tất cả
    };

    // Reset edit state khi đóng popup
    const handleClosePopup = () => {
        setPopupType(null);
        dispatch(setCategoryEdit({})); // Xóa data edit trong Redux
        fetchCategoriesData(); // Refresh list phòng khi vừa add/edit xong
    };

    const handlePopupSubmit = async (data) => {
        setIsLoading(true);
        try {
            if (popupType === "add") {

                const res = await addNewCategory(data);

                if (res.status === "SUCCESS" || res.success) {
                    alert("Successfully added new category");
                    handleClosePopup();
                } else {
                    alert(res.message);
                }
            } else if (popupType === "edit") {

                const res = await updateCategory(categoryEdit._id, data);
                console.log(res)
                if (res.status === "SUCCESS" || res.success) {
                    alert("Successfully updated category");
                    handleClosePopup();
                } else {
                    alert(res.message);
                }
            }
        } catch (error) {
            console.error("Error submitting category:", error);
            alert("An error occurred:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cx("container")}>
            {popupType && (
                <Popup
                    header={popupType === "add" ? "Add new category" : "Edit category"}
                    onClose={handleClosePopup}
                    onSubmit={handlePopupSubmit}
                    initialData={popupType === "edit" ? categoryEdit : {}}
                />
            )}
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Categories Management</h1>
                    <p>Manage your product categories</p>
                </div>
                <button className={cx("add-btn")} onClick={() => {
                    dispatch(setCategoryEdit({})); // Đảm bảo clear state trước khi add
                    setPopupType("add");
                }}>
                    + Add Category
                </button>
            </div>

            {/* Bộ lọc tìm kiếm */}
            <form className={cx("filter-block")} onSubmit={handleSubmitSearch}>
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
                    {currentCategories.map(category => (
                        <CategoryCard
                            key={category._id}
                            category={category}
                            onToggleStatus={handleToggleActive}
                            onEdit={handleEditCategory}
                            onDelete={handleDeleteCategory}
                        />
                    ))}
                </div>
            )}

            {/* Phân trang & Nút Back */}
            <div className={cx("footer-btn")}>
                {isShowBackBtn && (
                    <button className={cx("back-btn")} type="button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft}/> Back to all categories
                    </button>
                )}

                <div className={cx("pages-btn")}>
                    {Array.from({length: pagesCount}).map((_, index) => (
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