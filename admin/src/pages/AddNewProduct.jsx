import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/AddNewProduct.module.scss";
import {Link} from "react-router-dom";
import * as ProductService from "../services/ProductService.js";
import CircularProgress from '@mui/material/CircularProgress';

const cx = classNames.bind(style);

const AddNewProduct = () => {
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState({
        productName: '',
        description: '',
        oldPrice: '',
        newPrice: '',
        type: '',
        category: '',
        countInStock: 0
    });

    const [images, setImages] = useState([]);

    useEffect(() => {
        return () => {
            images.forEach(url => URL.revokeObjectURL(url));
        }
    }, [images]);

    const handleChangeImages = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
        const imagePreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...imagePreviews]);
    }

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
        setFiles(files.filter((_, index) => index !== indexToRemove));
    }

    const handleChangeForm = (e) => {
        const {name, value} = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            alert("Vui lòng chọn ít nhất 1 hình ảnh");
            return;
        }

        try {
            setIsLoading(true);
            // Tạo đối tượng FormData
            const formData = new FormData();

            // 1. Đưa dữ liệu text vào FormData
            // (Mình đã xóa dòng duplicate productName bị thừa ở code cũ)
            formData.append('productName', product.productName);
            formData.append('description', product.description);
            formData.append('oldPrice', product.oldPrice);
            formData.append('newPrice', product.newPrice);
            formData.append('type', product.type);
            formData.append('category', product.category);
            formData.append('countInStock', product.countInStock);

            if (files && files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    formData.append('images', files[i]);
                }
            }


            console.log("Đang gửi FormData...");


            const res = await ProductService.addNewProduct(formData);

            if (res.status === "OK") {
                alert("Thêm sản phẩm thành công!");

                // Reset form
                setProduct({
                    productName: '',
                    description: '',
                    oldPrice: '',
                    newPrice: '',
                    type: '',
                    category: '',
                    countInStock: 0
                });
                setImages([]);
                setFiles([]);
            } else {
                alert("Có lỗi: " + res.message);
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Lỗi kết nối server");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={cx("container")}>
            {/* ... (Phần giao diện giữ nguyên không đổi) ... */}
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Add New Product</h1>
                    <p>Fill in the detail to add a new product</p>
                </div>
            </div>

            <form className={cx("main-form")} onSubmit={handleSubmit}>
                <div className={cx("product-detail")}>
                    <h3>Product Detail</h3>
                    <label htmlFor="productName">
                        Product Name
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleChangeForm}
                            placeholder="e.g., Keyboard"
                            required
                        />
                    </label>

                    <label htmlFor="description">
                        Description
                        <textarea
                            name="description"
                            id="description"
                            value={product.description}
                            onChange={handleChangeForm}
                            placeholder="Write something about product..."
                            cols="30" rows="10"
                            required
                        ></textarea>
                    </label>

                    <div className={cx("prices")}>
                        <label htmlFor="oldPrice">
                            Old Price
                            <input
                                type="number"
                                id="oldPrice"
                                name="oldPrice"
                                value={product.oldPrice}
                                onChange={handleChangeForm}
                                min="1" step="0.01"

                            />
                        </label>
                        <label htmlFor="newPrice">
                            New Price
                            <input
                                type="number"
                                id="newPrice"
                                name="newPrice"
                                value={product.newPrice}
                                onChange={handleChangeForm}
                                min="1" step="0.01"
                                required
                            />
                        </label>
                    </div>

                    <label htmlFor="type">
                        Type
                        <select name="type" id="type" onChange={handleChangeForm} value={product.type} required>
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
                        <select name="category" id="category" onChange={handleChangeForm} value={product.category}
                                required>
                            <option value="">Select Category</option>
                            <option value="Black Friday Deals">Black Friday Deals</option>
                            <option value="New Arrivals">New Arrivals</option>
                            <option value="Hot Deals">Hot Deals</option>
                            <option value="Discounts">Discounts</option>
                        </select>
                    </label>

                    <label htmlFor="countInStock">
                        Count In Stock
                        <input
                            type="number"
                            id="countInStock"
                            name="countInStock"
                            onChange={handleChangeForm}
                            value={product.countInStock}
                            required
                        />
                    </label>

                    <div className={cx("image-upload-block")}>
                        <h4 className={cx("widget-title")}>Product Image</h4>
                        <label htmlFor="fileInputHidden" className={cx("upload-area")} id="uploadArea">
                            <div className={cx("icon-cloud")}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <p className={cx("upload-text")}>
                                <span className={cx("click-text")}>Click to upload</span> or drag and drop
                            </p>
                            <p className={cx("upload-subtext")}>PNG, JPG, GIF up to 10MB</p>
                        </label>

                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleChangeImages}
                            id="fileInputHidden"
                            style={{display: 'none'}}

                        />


                        <div className={cx("preview-images")}>
                            <h4>Preview Images </h4>
                            <div className={cx("image-wrapper")}>
                                {images.length > 0 && images.map((item, index) => (
                                    <div className={cx("preview-image")} key={index}>
                                        <img src={item} alt="preview"/>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveImage(index)
                                        }}>&times;</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {isLoading ? <CircularProgress/> : (
                        <div className={cx("btn-group")}>
                            <Link to="..">
                                <button type="button" className={cx("add-btn", "cancel-btn")}>Cancel</button>
                            </Link>
                            <button type="submit" className={cx("add-btn")}>Save Product</button>
                        </div>)}
                </div>
            </form>
        </div>
    );
};

export default AddNewProduct;