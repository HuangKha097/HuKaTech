import React, { useState } from "react"; // Thêm useState
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

    // 1. Khởi tạo State cho form
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    // 2. Xử lý khi người dùng gõ vào input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    // 3. Xử lý logic đổi mật khẩu
    const handleChangePassword = async (e) => {
        e.preventDefault(); // Ngăn chặn reload trang mặc định của form

        const { currentPassword, newPassword, confirmPassword } = passwordData;

        // Validate cơ bản ở Frontend
        if (newPassword !== confirmPassword) {
            alert("Mật khẩu mới và Xác nhận mật khẩu không khớp!");
            return;
        }

        if (newPassword.length < 6) {
            alert("Mật khẩu mới phải có ít nhất 6 ký tự!");
            return;
        }

        try {
            setIsLoading(true);
            const res = await UserService.changePassword({
                currentPassword,
                newPassword,
                confirmPassword
            });

            if (res.status === "OK") {
                alert("Đổi mật khẩu thành công!");
                // Reset form sau khi thành công
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            } else {
                alert(res.message || "Có lỗi xảy ra, vui lòng thử lại.");
            }
        } catch (err) {
            console.error("Change password error:", err);
            alert("Lỗi kết nối đến máy chủ.");
        } finally {
            setIsLoading(false);
        }
    };

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
            <div className={cxPages("header")}>
                <div className={cxPages("block-left")}>
                    <h1>Settings</h1>
                    <p>Manage your account security</p>
                </div>
            </div>

            <div className={cxSetting("settings-content")}>
                {/* 4. Gắn hàm xử lý vào form */}
                <form className={cxSetting("section")} onSubmit={handleChangePassword}>
                    <h2 className={cxSetting("section-title")}>
                        Change Password
                    </h2>

                    <div className={cxSetting("form-layout")}>
                        <div className={cxSetting("form-group")}>
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Enter current password"
                                value={passwordData.currentPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={cxSetting("form-group")}>
                            <label>New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder="Enter new password"
                                value={passwordData.newPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={cxSetting("form-group")}>
                            <label>Confirm New Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm new password"
                                value={passwordData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={cxSetting("save-btn")}
                        disabled={isLoading} // Vô hiệu hoá nút khi đang call API
                    >
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </form>

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