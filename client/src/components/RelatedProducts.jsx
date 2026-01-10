import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../assets/css/ProductShow.module.scss";
import ProductCard from "./ProductCard";
import * as ProductService from "../services/ProductService";

const cx = classNames.bind(styles);

const RelatedProducts = ({ type, currentProductId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (!type || !currentProductId) return;

        const fetchRelatedProducts = async () => {
            try {
                const res = await ProductService.getRelatedProducts(
                    type,
                    currentProductId
                );

                if (res?.data) {
                    setProducts(res.data);
                }
            } catch (error) {
                console.log("Error fetching related products:", error);
            }
        };

        fetchRelatedProducts();
    }, [type, currentProductId]);

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                <div className={cx("header")}>
                    <span className={cx("title")}>Related Products</span>
                </div>

                <div className={cx("body")}>
                    {products && products.length > 0 ? (
                        products.slice(0, 3).map((item) => (
                            <ProductCard
                                key={item._id}
                                props={item}
                                category={item.type}
                            />
                        ))
                    ) : (
                        <div style={{ color: "#fff", padding: "20px" }}>
                            No related products found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RelatedProducts;
