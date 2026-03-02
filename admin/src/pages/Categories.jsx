import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import pagesStyles from "../assets/css/Pages.module.scss";
import pageStyles from "../assets/css/CategoryPage.module.scss";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "../components/Popup";
import CategoryCard from "../components/CategoryCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCategories, setCategoryEdit } from "../redux/categorySlice.js";
import {
    deleteCategory,
    getAllCategories,
    searchCategories,
    updateCategory,
    addNewCategory,
} from "../services/CategoryService.js";

import CircularProgress from "@mui/material/CircularProgress";


const cxPages = classNames.bind(pagesStyles);
const cx = classNames.bind(pageStyles);

const CategoryPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.list) || [];
    const categoryEdit = useSelector((state) => state.categories.categoryEdit);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [popupType, setPopupType] = useState(null);
    const [isShowBackBtn, setIsShowBackBtn] = useState(false);
    const [payloadSearch, setPayloadSearch] = useState({
        name: "",
        status: "",
    });

    const ITEMS_PER_PAGE = 8;
    const pagesCount = Math.ceil(categories.length / ITEMS_PER_PAGE);

    const currentCategories = categories.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    // Fetch data
    const fetchCategoriesData = async () => {
        setIsLoading(true);
        try {
            // to test loading
            // await new Promise(resolve => setTimeout(resolve, 3000));

            const res = await  getAllCategories()

            console.log(res)
            if (res.status === "SUCCESS" || res.success) {
                dispatch(setCategories(res.data));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoriesData();
    }, []);

    const handleToggleActive = async (category) => {
        const newStatus =
            category.status === "active" ? "inactive" : "active";

        const res = await updateCategory(category._id, {
            status: newStatus,
        });

        if (res.status === "SUCCESS" || res.success) {
            fetchCategoriesData();
        }
    };

    const handleEditCategory = (category) => {
        dispatch(setCategoryEdit(category));
        setPopupType("edit");
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm("Are you sure?")) return;

        const res = await deleteCategory(id);
        if (res.status === "SUCCESS" || res.success) {
            fetchCategoriesData();
        }
    };

    const handleSubmitSearch = async (e) => {
        e.preventDefault();

        if (!payloadSearch.name && !payloadSearch.status) {
            return alert("Enter at least one field");
        }

        setIsLoading(true);
        try {
            const res = await searchCategories(payloadSearch);
            if (res.status === "SUCCESS" || res.success) {
                dispatch(setCategories(res.data));
                setIsShowBackBtn(true);
                setCurrentPage(0);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setPayloadSearch({ name: "", status: "" });
        setIsShowBackBtn(false);
        fetchCategoriesData();
    };

    const handleClosePopup = () => {
        setPopupType(null);
        dispatch(setCategoryEdit({}));
        fetchCategoriesData();
    };

    const handlePopupSubmit = async (data) => {
        setIsLoading(true);
        try {
            if (popupType === "add") {
                await addNewCategory(data);
            } else {
                await updateCategory(categoryEdit._id, data);
            }
            handleClosePopup();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cxPages("container")}>
            {popupType && (
                <Popup
                    header={
                        popupType === "add"
                            ? "Add new category"
                            : "Edit category"
                    }
                    onClose={handleClosePopup}
                    onSubmit={handlePopupSubmit}
                    initialData={popupType === "edit" ? categoryEdit : {}}
                />
            )}

            {/* HEADER */}
            <div className={cxPages("header")}>
                <div className={cxPages("block-left")}>
                    <h1>Categories Management</h1>
                    <p>Manage your product categories</p>
                </div>

                <button
                    className={cxPages("add-btn")}
                    onClick={() => setPopupType("add")}
                >
                    + Add Category
                </button>
            </div>

            {/* FILTER */}
            <form className={cxPages("filter-block")} onSubmit={handleSubmitSearch}>
                <label for="name-input">
                    <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={payloadSearch.name}
                        placeholder="Search category..."
                        onChange={(e) =>
                            setPayloadSearch({
                                ...payloadSearch,
                                name: e.target.value,
                            })
                        }
                    />

                </label>
                <label for="status-select">
                    <select
                        id="status-select"
                        name="status"
                        value={payloadSearch.status}
                        onChange={(e) =>
                            setPayloadSearch({
                                ...payloadSearch,
                                status: e.target.value,
                            })
                        }
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </label>

                <button type="submit" className={cxPages("search-btn")}>
                    Search
                </button>
            </form>


            {isLoading ? (
                <div style={{ textAlign: "center", padding: "20px", flex: "1" }}><CircularProgress /></div>
            ) : (
                <div className={cx("cards-grid")}>
                    {currentCategories.map((category) => (
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

            {/* FOOTER */}
            <div className={cxPages("footer-btn")}>
                {isShowBackBtn && (
                    <button className={cxPages("back-btn")} onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />  Back to all categories
                    </button>
                )}

                <div className={cxPages("pages-btn")}>
                    {Array.from({ length: pagesCount }).map((_, index) => (
                        <button
                            key={index}
                            className={cxPages(
                                "page-btn",
                                currentPage === index && "active"
                            )}
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