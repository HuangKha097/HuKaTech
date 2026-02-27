import React from "react";
import classNames from "classnames/bind";
import style from "../assets/css/Popup.module.scss";

const cx = classNames.bind(style);

// Bổ sung prop initialData (mặc định là object rỗng)
const Popup = ({ header, onClose, onSubmit, initialData = {} }) => {

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (onSubmit) onSubmit(data);
    };

    return (
        <div className={cx("container")} onClick={onClose}>
            <div
                className={cx("popup-wrapper")}
                onClick={(e) => e.stopPropagation()}
            >
                <span>{header}</span>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="input-name">
                        Name:
                        <input
                            type="text"
                            id="input-name"
                            name="name"
                            required
                            defaultValue={initialData.name || ""} // Tự động điền khi Edit
                        />
                    </label>

                    <label htmlFor="input-description">
                        Description:
                        <textarea
                            id="input-description"
                            name="description"
                            rows="3"
                            defaultValue={initialData.description || ""} // Tự động điền khi Edit
                        ></textarea>
                    </label>

                    {/* Tự động chọn đúng status khi Edit */}
                    <select name="status" required defaultValue={initialData.status || ""}>
                        <option value="" disabled>Choose status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <div className={cx("button-group")}>
                        <button
                            type="button"
                            className={cx("cancel")}
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={cx("submit")}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Popup;