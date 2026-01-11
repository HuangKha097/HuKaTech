import classNames from "classnames/bind";
import Slidebar from "./components/Slidebar.jsx";
import style from "./assets/css/App.module.scss"
import AddNewProduct from "./pages/AddNewProduct.jsx";
import {Route, Routes} from 'react-router-dom';
import Products from "./pages/Products.jsx";
import EditProduct from "./pages/EditProduct.jsx";

const cx = classNames.bind(style);

function App() {
    return (
        <>
            <div className={cx("container")}>
                <div className={cx("slidebar-block")}>
                    <Slidebar/>
                </div>


                <div className={cx("main-block")}>
                    <Routes>
                        <Route path="/products">
                            <Route index element={<Products/>}/>
                            <Route path="add-new-product" element={<AddNewProduct />} />
                            <Route path="edit-product/:id" element={<EditProduct />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default App;