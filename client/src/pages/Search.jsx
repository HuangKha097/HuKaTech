import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../assets/css/DetailCategory.module.scss";
import Newsletter from "../components/Newsletter";
import Tag from "../components/Tag";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const cx = classNames.bind(styles);

const Search = () => {
    const products = useSelector(
        (state) => state.subfilter.productsSearch
    );

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className={cx("container")}>
            <div className={cx("content")}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={cx("header")}
                >
                    <Tag props="Search results" />

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={cx("title")}
                    >
                        As Hot As They Come. Shop Now!
                    </motion.h1>
                </motion.div>

                {/* Products */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={cx("products-wrapper")}>
                        {products && products.length > 0 ? (
                            products.map((item, index) => (
                                <ProductCard
                                    key={index}
                                    props={item}
                                    category={item.category}
                                />
                            ))
                        ) : (
                            <p className={cx("no-product-found")}>
                                No product found
                            </p>
                        )}
                    </div>
                </motion.div>

                <Newsletter />
            </div>
        </div>
    );
};

export default Search;
