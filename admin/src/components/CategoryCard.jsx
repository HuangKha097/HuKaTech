import React from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/CategoryCard.module.scss";
import { faEdit, faEye, faEyeSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(style);

const CategoryCard = ({ category, onToggleStatus, onEdit, onDelete }) => {
    return (
        <div className={cx("category-card")}>
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
                    onClick={() => onToggleStatus(category)}
                    title={category.status === 'active' ? 'Deactivate' : 'Activate'}
                >
                    <FontAwesomeIcon icon={category.status === 'active' ? faEyeSlash : faEye} />
                </button>

                <button
                    className={cx("action-btn", "edit-btn")}
                    title="Edit"
                    onClick={() => onEdit(category)}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>

                <button
                    className={cx("action-btn", "delete-btn")}
                    onClick={() => onDelete(category._id)}
                    title="Delete"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;