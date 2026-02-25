import React from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/Settings.module.scss";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setToken} from "../redux/userSlice.js";

const cx = classNames.bind(style);

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?");
        if (!isConfirm) return;

        try {
            if (isConfirm) {
                dispatch(setToken(null));
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Settings</h1>
                    <p>Manage your account security</p>
                </div>
            </div>

            <div className={cx("settings-content")}>
                {/* Change Password Section */}
                <form className={cx("section")}>
                    <h2 className={cx("section-title")}>Change Password</h2>

                    <div className={cx("form-layout")}>
                        <label className={cx("form-group")}>
                            Current Password
                            <input
                                type="password"
                                name="currentPassword"


                                placeholder="Enter current password"
                                required
                            />
                        </label>
                        <label className={cx("form-group")}>
                            New Password
                            <input
                                type="password"
                                name="newPassword"


                                placeholder="Enter new password"
                                required
                            />
                        </label>
                        <label className={cx("form-group")}>
                            Confirm New Password
                            <input
                                type="password"
                                name="confirmPassword"


                                placeholder="Confirm new password"
                                required
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className={cx("save-btn")}

                    >

                    </button>
                </form>

                {/* Logout Section */}
                <div className={cx("section")}>
                    <h2 className={cx("section-title")}>Account Actions</h2>
                    <p className={cx("description")}>Log out of your account on this device.</p>
                    <button
                        type="button"
                        className={cx("logout-btn")}
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;