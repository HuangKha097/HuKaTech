import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/LoginPage.module.scss';

const cx = classNames.bind(styles);

const LoginPage = () => {
    // State quản lý việc trượt panel (Login <-> Register)
    const [isActive, setIsActive] = useState(false);

    // State quản lý hiển thị form Forgot Password
    const [showForgot, setShowForgot] = useState(false);

    // State quản lý ẩn/hiện mật khẩu
    const [showPassword, setShowPassword] = useState(false);

    // State cho Forgot Password flow (gửi code -> nhập code)
    const [codeSent, setCodeSent] = useState(false);

    // Xử lý chuyển đổi Login/Register
    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    // Xử lý Forgot Password
    const handleForgotClick = (e) => {
        e.preventDefault();
        setShowForgot(true);
    };

    const handleBackToLogin = () => {
        setShowForgot(false);
        setCodeSent(false); // Reset trạng thái form quên mật khẩu
    };

    const handleSendCode = () => {
        // Logic gửi code ở đây
        setCodeSent(true);
    };

    return (
        <div className={cx('login-page-wrapper')}>
            <div className={cx('container', { active: isActive, 'show-forgot': showForgot })} id="container">

                {/* --- FORM SIGN UP --- */}
                <div className={cx('form-container', 'sign-up')}>
                    <form>
                        <h1>Create Account</h1>

                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" required />
                        <input type="email" placeholder="Email" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm your Password" required />

                        <a href="/isLoginedIndex.html">
                            <button className={cx('btn')}>Sign Up</button>
                        </a>
                    </form>
                </div>

                {/* --- FORM SIGN IN --- */}
                <div className={cx('form-container', 'sign-in')}>
                    <form>
                        <h1>Sign In</h1>

                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" />

                        <div className={cx('password-field')}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                            />
                            <i
                                className={cx('fa-solid', showPassword ? 'fa-eye' : 'fa-eye-slash')}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>

                        <button type="button" onClick={handleForgotClick} id="showForgot">
                            Forget Your Password?
                        </button>

                        <button
                            className={cx('btn-login')}
                            type="button"
                            onClick={() => window.location.href='./isLoginedIndex.html'}
                        >
                            Sign In
                        </button>
                    </form>
                </div>

                {/* --- TOGGLE PANEL (Overlay trượt) --- */}
                <div className={cx('toggle-container')}>
                    <div className={cx('toggle')}>
                        <div className={cx('toggle-panel', 'toggle-left')}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className={cx('hidden')} onClick={handleLoginClick} id="login">
                                Sign In
                            </button>
                        </div>
                        <div className={cx('toggle-panel', 'toggle-right')}>
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className={cx('hidden')} onClick={handleRegisterClick} id="register">
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- FORM FORGOT PASSWORD --- */}
                <div className={cx('form-container', 'forgot-password')}>
                    <span className={cx('close-forgot')} onClick={handleBackToLogin}>&times;</span>

                    <form id="forgotPasswordForm">
                        <h1>Reset Password</h1>
                        <p className={cx('message')}></p>

                        <span>Enter your email to receive a code</span>
                        <input type="email" placeholder="Email" required />

                        <button type="button" onClick={handleSendCode}>Send Code</button>

                        {/* Code field hiển thị sau khi bấm Send Code */}
                        <div className={cx('code-field', { show: codeSent })}>
                            <span>Enter code and new password</span>
                            <input type="text" placeholder="Verification Code" />
                            <input type="password" placeholder="New Password" />
                            <button type="submit">Reset Password</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;