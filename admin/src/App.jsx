import classNames from "classnames/bind";
import Slidebar from "./components/Slidebar.jsx";
import style from "./assets/css/App.module.scss"
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Products from "./pages/Products.jsx";
import ProductForm from "./pages/ProductForm.jsx";
import Orders from "./pages/Orders.jsx";
import Categories from "./pages/Categories.jsx";
import Customers from "./pages/Customers.jsx";
import Settings from "./pages/Settings.jsx";
import SalesnReport from "./pages/SalesReport.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";

// THÊM: import useEffect
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from './redux/userSlice';
import {ProtectedRoute} from "../src/protected/ProtectedRoute.jsx";

const cx = classNames.bind(style);

function App() {
    const token = useSelector((state) => state.user.token);
    const location = useLocation();
    const dispatch = useDispatch();

    const validRoutes = [
        "/",
        "/login",
        "/products",
        "/products/form",
        "/categories",
        "/orders",
        "/customers",
        "/sales&reports",
        "/setting"
    ];

    const isNotFound = !validRoutes.includes(location.pathname);

    const hideSidebar = location.pathname === "/login" || isNotFound;

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && !token) {
            dispatch(setToken(storedToken));
        }
    }, [dispatch, token]);

    return (
        <>
            <div className={cx("container")}>
                {!hideSidebar && (
                    <div className={cx("slidebar-block")}>
                        <Slidebar/>
                    </div>
                )}
                <Routes>
                    <Route path="/" element={<Navigate to="/sales&reports" />}/>
                    <Route
                        path="/login"
                        element={!token ? <Login/> : <Navigate to="/products"/>}
                    />

                    <Route
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Products/>
                            </ProtectedRoute>
                        }
                    />

                    <Route path="/products/form" element={<ProductForm/>}/>

                    <Route
                        path="/categories"
                        element={
                            <ProtectedRoute>
                                <Categories/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders/>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            <ProtectedRoute>
                                <Customers/>
                            </ProtectedRoute>
                        }
                    /><Route
                        path="/sales&reports"
                        element={
                            <ProtectedRoute>
                                <SalesnReport/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/setting"
                        element={
                            <ProtectedRoute>
                                <Settings/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    )
}

export default App;