import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/AddNewProduct.module.scss";
import {Link} from "react-router-dom";
import * as ProductService from "../services/ProductService.js";

const cx = classNames.bind(style);

const AddNewProduct = () => {
    const [files, setFiles] = useState([]);
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

    // --- 1. Hàm hỗ trợ chuyển File sang Base64 ---
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    // --- 2. Sửa lại hàm Submit để gửi JSON ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Đang xử lý ảnh...");

            // Chuyển tất cả file ảnh sang chuỗi Base64
            // Kết quả sẽ là mảng các chuỗi rất dài: ["data:image/png;base64,iVBOR...", ...]
            const base64Images = await Promise.all(files.map(file => convertToBase64(file)));

            // Tạo object JSON thuần túy
            const payload = {
                productName: product.productName,
                description: product.description,
                oldPrice: Number(product.oldPrice), // Ép kiểu số cho an toàn với JSON
                newPrice: Number(product.newPrice),
                type: product.type,
                category: product.category,
                countInStock: Number(product.countInStock),
                images: base64Images // Mảng string base64
            };

            console.log("Dữ liệu JSON chuẩn bị gửi:", payload);

            // Gọi API
            // Lưu ý: ProductService.addNewProduct phải cấu hình header 'Content-Type': 'application/json'
            const res = await ProductService.addNewProduct(payload);

            if (res.status === "OK") {
                alert("Thêm sản phẩm thành công!");

                setProduct({});
                setImages([]);
            } else {
                alert("Có lỗi xảy ra!");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Không thể kết nối hoặc ảnh quá lớn.");
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
                            />
                        </label>
                    </div>

                    <label htmlFor="type">
                        Type
                        <select name="type" id="type" onChange={handleChangeForm} value={product.type}>
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
                        <select name="category" id="category" onChange={handleChangeForm} value={product.category}>
                            <option value="">Select Category</option>
                            <option value="Black Friday Deals">Black Friday Deals</option>
                            <option value="Aew Arrivals">New Arrivals</option>
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

                        <input type="file" multiple onChange={handleChangeImages} id="fileInputHidden"
                               style={{display: 'none'}}/>

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

                    <div className={cx("btn-group")}>
                        <Link to="..">
                            <button type="button" className={cx("add-btn", "cancel-btn")}>Cancel</button>
                        </Link>
                        <button type="submit" className={cx("add-btn")}>Save Product</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNewProduct;