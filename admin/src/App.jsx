import classNames from "classnames/bind";
import Slidebar from "./components/Slidebar.jsx";
import style from "./assets/css/App.module.scss"
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Products from "./pages/Products.jsx";
import ProductForm from "./pages/ProductForm.jsx";
import Orders from "./pages/Orders.jsx";
import Categories from "./pages/Categories.jsx";
import Settings from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";

// THÊM: import useEffect
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/userSlice';
import { ProtectedRoute } from "../src/protected/ProtectedRoute.jsx";

const cx = classNames.bind(style);

function App() {
    const token = useSelector((state) => state.user.token);
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && !token) {
            dispatch(setToken(storedToken));
        }
    }, [dispatch, token]);

    return (
        <>
            <div className={cx("container")}>
                {location.pathname !== "/login" && <div className={cx("slidebar-block")}>
                    <Slidebar/>
                </div>}

                <Routes>

                    <Route
                        path="/login"
                        element={!token ? <Login /> : <Navigate to="/products" />}
                    />

                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/products/form" element={<ProductForm />} />

                    <Route
                        path="/categories"
                        element={
                            <ProtectedRoute>
                                <Categories />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/setting"
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </>
    )
}

export default App;