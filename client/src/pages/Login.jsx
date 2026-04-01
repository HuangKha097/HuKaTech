import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/LoginPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const LoginPage = () => {

    const [isActive, setIsActive] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const handleRegisterClick = () => setIsActive(true);
    const handleLoginClick = () => setIsActive(false);

    const handleForgotClick = (e) => {
        e.preventDefault();
        setShowForgot(true);
    };

    const handleBackToLogin = () => {
        setShowForgot(false);
        setCodeSent(false);
    };

    const handleSendCode = () => {

        setCodeSent(true);
    };

    return (
        <div className={cx('login-page-wrapper')}>
            <div className={cx('container', { active: isActive, 'show-forgot': showForgot })} id="container">

                <div className={cx('form-container', 'sign-up')}>
                    <form>
                        <h1>Create Account</h1>

                        <span>or use your phone for registration</span>
                        <input type="text" placeholder="Name" required />
                        <input type="text" placeholder="Phone number" required />
                        <input type="password" placeholder="Password" required />
                        <input type="password" placeholder="Confirm your Password" required />


                            <button className={cx('btn')}>Sign Up</button>

                    </form>
                </div>

                <div className={cx('form-container', 'sign-in')}>
                    <form>
                        <h1>Sign In</h1>

                        <span>or use your phone password</span>
                        <input type="text" placeholder="Phone number" />

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

                        <a type="button" onClick={handleForgotClick} id="showForgot">
                            Forget Your Password?
                        </a>

                        <button
                            className={cx('btn-login')}
                            type="button"
                            onClick={() => window.location.href='./isLoginedIndex.html'}
                        >
                            Sign In
                        </button>
                    </form>
                </div>

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
                <div className={cx('form-container', 'forgot-password')}>
                    <span className={cx('close-forgot')} onClick={handleBackToLogin}><FontAwesomeIcon icon={faCircleXmark} /></span>

                    <form id="forgotPasswordForm">
                        <h1>Reset Password</h1>
                        <p className={cx('message')}></p>

                        <span>Enter your phone to receive a code</span>
                        <input type="text" placeholder="Phone number" required />

                        <button type="button" onClick={handleSendCode}>Send Code</button>
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