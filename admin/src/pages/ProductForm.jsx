import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import pagesStyles from "../assets/css/Pages.module.scss";
import pageStyles from "../assets/css/AddNewProductPage.module.scss";
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {useSelector} from "react-redux";
import * as ProductService from "../services/ProductService.js";
import * as CategoryService from "../services/CategoryService.js";

const cxPages = classNames.bind(pagesStyles);
const cx = classNames.bind(pageStyles);

const ProductForm = () => {
    const navigate = useNavigate();

    const productEdit = useSelector(state => state.products.productsEdit);

    const isEditMode = Boolean(productEdit && productEdit._id);

    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);

    const [activeCategories, setActiveCategories] = useState([]);

    const [formData, setFormData] = useState({
        name: '', description: '', oldPrice: '', newPrice: '', type: '', category: '', countInStock: 0, oldImages: [] // Chứa ảnh cũ từ DB khi ở chế độ Edit
    });

    useEffect(() => {
        if (isEditMode) {
            setFormData({
                name: productEdit.name || '',
                description: productEdit.description || '',
                oldPrice: productEdit.oldPrice || '',
                newPrice: productEdit.newPrice || '',
                type: productEdit.type || '',
                category: productEdit.category || '',
                countInStock: productEdit.countInStock || 0,
                oldImages: productEdit.images || []
            });
        }
    }, [isEditMode, productEdit]);


    const handleChangeForm = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await CategoryService.getActiveCategories();
                console.log(res)
                if (res && res.status === "SUCCESS") {
                    setActiveCategories(res.data);
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách danh mục:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleChangeImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

        const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imagePreviews]);
        console.log("imagePreviews: ", imagePreviews);

        e.target.value = null;
    };

    const removeOldImage = (indexToRemove) => {
        setFormData(prev => ({
            ...prev, oldImages: prev.oldImages.filter((_, i) => i !== indexToRemove)
        }));
    };

    const removeNewImage = (indexToRemove) => {

        URL.revokeObjectURL(images[indexToRemove]);
        setImages(images.filter((_, index) => index !== indexToRemove));
        setFiles(files.filter((_, index) => index !== indexToRemove));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            if (formData.oldImages.length === 0 && files.length === 0) {
                alert("Sản phẩm phải có ít nhất 1 hình ảnh");
                return;
            }
        } else {
            if (files.length === 0) {
                alert("Vui lòng chọn ít nhất 1 hình ảnh");
                return;
            }
        }

        try {
            setIsLoading(true);
            const payloadData = new FormData();

            payloadData.append("name", formData.name);
            payloadData.append("description", formData.description);
            payloadData.append("oldPrice", formData.oldPrice);
            payloadData.append("newPrice", formData.newPrice);
            payloadData.append("type", formData.type);
            payloadData.append("category", formData.category);
            payloadData.append("countInStock", formData.countInStock);

            files.forEach(file => {
                payloadData.append("images", file);
            });

            let res;
            if (isEditMode) {

                payloadData.append("oldImages", JSON.stringify(formData.oldImages));
                res = await ProductService.updateProduct(productEdit._id, payloadData);
                if (res.status === "OK") alert("Cập nhật sản phẩm thành công!");
            } else {

                res = await ProductService.addNewProduct(payloadData);
                if (res.status === "OK") {
                    alert("Thêm sản phẩm thành công!");

                    setFormData({
                        name: '',
                        description: '',
                        oldPrice: '',
                        newPrice: '',
                        type: '',
                        category: '',
                        countInStock: 0,
                        oldImages: []
                    });
                    setImages([]);
                    setFiles([]);
                }
            }
        } catch (error) {
            console.error(error);
            alert("Lỗi kết nối server");
        } finally {
            setIsLoading(false);
        }
    };

    return (<div className={cxPages("container")}>
        <div className={cxPages("header")}>
            <div className={cxPages("block-left")}>
                <h1>{isEditMode ? "Edit Product" : "Add New Product"}</h1>
                <p>{isEditMode ? "Edit your product details" : "Fill in the details to add a new product"}</p>
            </div>
        </div>

        <form className={cx("main-form")} onSubmit={handleSubmit}>
            <div className={cx("product-detail")}>
                <h3>Product Detail</h3>
                <label htmlFor="productName">
                    Product Name
                    <input type="text" id="productName" name="name" value={formData.name}
                           onChange={handleChangeForm} placeholder="e.g., Keyboard" required/>
                </label>

                <label htmlFor="description">
                    Description
                    <textarea name="description" id="description" value={formData.description}
                              onChange={handleChangeForm} placeholder="Write something about product..." cols="30"
                              rows="10" required></textarea>
                </label>

                <div className={cx("prices")}>
                    <label htmlFor="oldPrice">
                        Old Price
                        <input type="number" id="oldPrice" name="oldPrice" value={formData.oldPrice}
                               onChange={handleChangeForm} min="1" step="0.01"/>
                    </label>
                    <label htmlFor="newPrice">
                        New Price
                        <input type="number" id="newPrice" name="newPrice" value={formData.newPrice}
                               onChange={handleChangeForm} min="1" step="0.01" required/>
                    </label>
                </div>

                <label htmlFor="type">
                    Type
                    <select name="type" id="type" onChange={handleChangeForm} value={formData.type}>
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
            </div>

            <div className={cx("organization-block")}>
                <h3>Organization</h3>
                <label htmlFor="category">
                    Category
                    <select
                        name="category"
                        id="category"
                        onChange={handleChangeForm}
                        value={formData.category}
                        required
                    >
                        <option value="">Select Category</option>
                        {isEditMode && formData.category && !activeCategories.some(cat => cat.name === formData.category) && (
                            <option value={formData.category}>
                                {formData.category} (Inactive)
                            </option>)}
                        {activeCategories.map((cat) => (<option key={cat._id} value={cat.name}>
                            {cat.name}
                        </option>))}
                    </select>
                </label>

                <label htmlFor="countInStock">
                    Count In Stock
                    <input type="number" id="countInStock" name="countInStock" onChange={handleChangeForm}
                           value={formData.countInStock} required/>
                </label>

                <div className={cx("image-upload-block")}>
                    <h4 className={cx("widget-title")}>Product Image</h4>
                    <label htmlFor="fileInputHidden" className={cx("upload-area")} id="uploadArea">

                        <p className={cx("upload-text")}>
                            <span className={cx("click-text")}>Click to upload</span> or drag and drop
                        </p>
                    </label>

                    <input type="file" multiple accept="image/*" onChange={handleChangeImages} id="fileInputHidden"
                           style={{display: 'none'}}/>

                    <div className={cx("preview-images")}>
                        <h4>Preview Images </h4>
                        <div className={cx("image-wrapper")}>

                            {isEditMode && formData.oldImages.map((item, index) => (
                                <div className={cx("preview-image")} key={`old-${index}`}>
                                    <img src={item.url} alt="old-preview"/>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        removeOldImage(index);
                                    }}>&times;</button>
                                </div>))}


                            {images.map((url, index) => (<div className={cx("preview-image")} key={`new-${index}`}>
                                <img src={url} alt="new-preview"/>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    removeNewImage(index);

                                }}>&times;</button>
                            </div>))}
                        </div>
                    </div>
                </div>

                {isLoading ? <CircularProgress/> : (<div className={cx("btn-group")}>
                    <button type="button" className={cx("add-btn", "cancel-btn")}
                            onClick={() => navigate(-1)}>Cancel
                    </button>
                    <button type="submit"
                            className={cx("add-btn")}>{isEditMode ? "Update Product" : "Save Product"}</button>
                </div>)}
            </div>
        </form>
    </div>);
};

export default ProductForm;