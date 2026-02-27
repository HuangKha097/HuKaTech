import React from "react";
import classNames from "classnames/bind";
import style from "../assets/css/Popup.module.scss";

const cx = classNames.bind(style);

const Popup = ({ header, onClose, onSubmit }) => {

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
                        />
                    </label>

                    <label htmlFor="input-description">
                        Description:
                        <textarea
                            id="input-description"
                            name="description"
                            rows="3"
                        ></textarea>
                    </label>

                    <select name="status" required>
                        <option value="">Choose status</option>
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