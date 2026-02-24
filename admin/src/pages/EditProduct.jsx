import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/AddNewProduct.module.scss";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch, useSelector} from "react-redux";
import {setProductsEdit} from "../redux/productsSlice.js";
import * as ProductService from "../services/ProductService.js";

const cx = classNames.bind(style);

const EditProduct = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const product = useSelector(state => state.products.productsEdit);
    console.log("productedit", product);
    console.log("file", files);
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    console.log("iamge", images);


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
        //Reset value của input file sau khi chọn
        e.target.value = null;

    }

    const removeOldImage = (index) => {
        dispatch(setProductsEdit({
            ...product,
            images: product.images.filter((_, i) => i !== index)
        }));
    };

    const removeNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setFiles(prev => prev.filter((_, i) => i !== index));
    };


    // setProductsEdit là Redux action KHÔNG GIỐNG STATE
    const handleChangeForm = (e) => {
        const {name, value} = e.target;

        dispatch(setProductsEdit({
            ...product,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            (!product.images || product.images.length === 0) &&
            files.length === 0
        ) {
            alert("Sản phẩm phải có ít nhất 1 hình ảnh");
            return;
        }
        try {
            setIsLoading(true);

            const formData = new FormData();

            formData.append("name", product.name);
            formData.append("description", product.description);
            formData.append("oldPrice", product.oldPrice);
            formData.append("newPrice", product.newPrice);
            formData.append("type", product.type);
            formData.append("category", product.category);
            formData.append("countInStock", product.countInStock);

            // gửi ảnh cũ còn giữ
            formData.append(
                "oldImages",
                JSON.stringify(product.images)
            );

            // ảnh mới
            files.forEach(file => {
                formData.append("images", file);
            });
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }


            const res = await ProductService.updateProduct(product._id, formData);


            if (res.status === "OK") {
                alert("Cập nhật sản phẩm thành công!");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Edit Product</h1>
                    <p>Edit your product</p>
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
                            name="name"
                            value={product.name}
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
                                {/* Ảnh cũ */}
                                {product?.images?.map((item, index) => (
                                    <div className={cx("preview-image")} key={`old-${index}`}>
                                        <img src={item.url}/>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            removeOldImage(index);
                                        }}>&times;</button>
                                    </div>
                                ))}

                                {/* Ảnh mới */}
                                {images.map((url, index) => (
                                    <div className={cx("preview-image")} key={`new-${index}`}>
                                        <img src={url}/>
                                        <button onClick={(e) => {
                                            e.preventDefault();
                                            removeNewImage(index);
                                        }}>&times;</button>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    {isLoading ? <CircularProgress/> : (
                        <div className={cx("btn-group")}>
                            <button
                                type="button"
                                className={cx("add-btn", "cancel-btn")}
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className={cx("add-btn")}>Save Product</button>
                        </div>)}
                </div>
            </form>
        </div>
    );
};

export default EditProduct;