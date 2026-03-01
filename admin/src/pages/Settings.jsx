import React from "react";
import classNames from "classnames/bind";
import pagesStyles from "../assets/css/Pages.module.scss";
import settingStyles from "../assets/css/Settings.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice.js";
import * as UserService from "../services/UserService.js";

const cxPages = classNames.bind(pagesStyles);
const cxSetting = classNames.bind(settingStyles);

const Settings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirm = window.confirm(
            "Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?"
        );
        if (!confirm) return;

        try {
            await UserService.logout();
        } catch (err) {
            console.error("Logout API error:", err);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");
            dispatch(setToken(null));
            navigate("/login");
        }
    };

    return (
        <div className={cxPages("container")}>
            {/* HEADER - Pages CSS */}
            <div className={cxPages("header")}>
                <div className={cxPages("block-left")}>
                    <h1>Settings</h1>
                    <p>Manage your account security</p>
                </div>
            </div>

            {/* CONTENT - Setting CSS */}
            <div className={cxSetting("settings-content")}>
                {/* Change Password */}
                <form className={cxSetting("section")}>
                    <h2 className={cxSetting("section-title")}>
                        Change Password
                    </h2>

                    <div className={cxSetting("form-layout")}>
                        <div className={cxSetting("form-group")}>
                            <label>Current Password</label>
                            <input
                                type="password"
                                placeholder="Enter current password"
                                required
                            />
                        </div>

                        <div className={cxSetting("form-group")}>
                            <label>New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                required
                            />
                        </div>

                        <div className={cxSetting("form-group")}>
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                placeholder="Confirm new password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={cxSetting("save-btn")}
                    >
                        Save Changes
                    </button>
                </form>

                {/* Logout */}
                <div className={cxSetting("section")}>
                    <h2 className={cxSetting("section-title")}>
                        Account Actions
                    </h2>

                    <p className={cxSetting("description")}>
                        Log out of your account on this device.
                    </p>

                    <button
                        className={cxSetting("logout-btn")}
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