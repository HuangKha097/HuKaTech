import React from 'react';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import DetailCategory from './pages/DetailCategory';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';

import ProductDetail from './pages/ProductDetail';
import ContactBlock from './components/ContactBlock';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Login from "./pages/Login.jsx";
const Layout = () => {
    const location = useLocation()
    //
    // const isLoginPage = location.pathname === '/login';
    return (
        <>
            {/*{!isLoginPage && <NavBar/>}*/}
             <NavBar/>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:category" element={<DetailCategory />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/search/:value" element={<Search />} />
                {/*<Route path="/login" element={<Login />} />*/}
            </Routes>
            <ContactBlock />
            {/*{!isLoginPage &&  <Footer />}*/}
            <Footer />
        </>
    );
};
const App = () => {
    return (
        <Router>
            <Layout />
        </Router>
    );
};

export default App;
