import React, {useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/LoginPage.module.scss"
import {Link} from "react-router-dom"
import * as UserService from "../services/UserService.js"
import {useDispatch} from "react-redux";
import {setToken} from "../redux/userSlice.js"
import CircularProgress from '@mui/material/CircularProgress';

const cx = classNames.bind(style);
const Login = () => {
    const dispatch = useDispatch();

    const [phone, setPhone] = useState("0969422821");
    const [password, setPassword] = useState("123456");
    const [errorText, setErrortext] = useState()
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (data) => {
        try {
            setLoading(true)
            const res = await UserService.login(data);

            if (res.status === "OK") {
                dispatch(setToken(res.access_token));
                localStorage.setItem("token", res.access_token);
                localStorage.setItem("refresh_token", res.refresh_token)
                navigate("/");
            } else {
                setErrortext(res.message);
            }

        } catch (error) {
            console.log("error: ", error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className={cx("container")}>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({phone, password})
            }} action="" className={cx("main-form")}>
                <h2>Login</h2>
                <label>
                    <span>Phone number:</span>
                    <input value={phone} name={"phoneNumber"} type="text" className={cx("form-input")}
                           onChange={e => setPhone(e.target.value)}/>
                </label>
                <label>
                    <span>Password:</span>
                    <input value={password} name={"password"} type="password" className={cx("form-input")}
                           onChange={e => setPassword(e.target.value)}/>
                </label>
                {errorText && <span className={cx("error-text")}>
                    {
                        errorText
                    }
                </span>}
                {
                    !loading?<button type="submit">
                        Login
                    </button>:<CircularProgress />
                }
                <Link>
                    Forgot password?
                </Link>
            </form>
        </div>
    );
};

export default Login;