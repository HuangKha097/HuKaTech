import classNames from 'classnames/bind'
import styles from '../assets/css/Table.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faPen, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import * as ProductService from "../services/ProductService.js";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setProductsEdit} from "../redux/productsSlice.js";

const cx = classNames.bind(styles)
const Table = ({data = [], onDelete, onView}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getProductImage = (item) => {
        if (item.images?.length && item.images[0].url) {
            return item.images[0].url
        }
        return 'https://via.placeholder.com/60'
    }

    const handleGetProductUpdate = async (product) => {
        try {
            const res = await ProductService.getProductById(product._id);
            if (res.status === "OK" && res.message === "SUCCESS") {
                dispatch(setProductsEdit(res.data))
                navigate(`/products/edit-product/${product._id}`);

            } else {
                alert("Error occurred while getting products");

            }
        } catch (error) {
            console.log(error);
        }
    }
    const hanleActiveProduct = async (productId) => {
        try {
            const res = await ProductService.handleActiveProduct(productId);
            if (res.status === "OK") {
                alert("Successfully updated product");
            }else {
                alert("Error occurred while getting products");
            }
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <table className={cx('table')}>
            <thead className={cx('thead')}>
            <tr>
                <th className={cx('th', 'imageCol')}>Image</th>
                <th className={cx('th', 'nameCol')}>Name</th>
                <th className={cx('th', 'descCol')}>Description</th>
                <th className={cx('th', 'priceCol')}>Old Price</th>
                <th className={cx('th', 'priceCol')}>New Price</th>
                <th className={cx('th', 'stockCol')}>Stock</th>
                <th className={cx('th', 'categoryCol')}>Category</th>
                {/* THÊM: Cột Action */}
                <th className={cx('th', 'actionCol')}>Action</th>
            </tr>
            </thead>

            <tbody>
            {data.length > 0 && data.map((item) => (
                <tr key={item._id} className={cx('row')}>
                    <td className={cx('td')}>
                        <img
                            src={getProductImage(item)}
                            alt={item.name}
                            className={cx('productImage')}
                        />
                    </td>

                    <td className={cx('td')}>
                        <div className={cx('textClamp', 'nameText')}>
                            {item.name}
                        </div>
                    </td>

                    <td className={cx('td')}>
                        <div className={cx('textClamp', 'descText')}>
                            {item.description || '-'}
                        </div>
                    </td>

                    <td className={cx('td', 'priceText')}>
                        {item.oldPrice ?? '-'}
                    </td>

                    <td className={cx('td', 'priceText')}>
                        {item.newPrice?.toLocaleString()} đ
                    </td>

                    <td className={cx('td', 'centerText')}>
                        {item.countInStock ?? '-'}
                    </td>

                    <td className={cx('td')}>
                        {item.category || '-'}
                    </td>

                    {/* THÊM: Các nút Action */}
                    <td className={cx('td')}>
                        <div className={cx('actionGroup')}>

                            {/* Nút ẩn sản phẩm */}
                            {
                                item.status === "inactive" ?
                                    <button
                                        className={cx('actionBtn', 'viewBtn')}
                                        title="Bỏ ẩn sản phẩm"
                                        onClick={()=>onView(item._id)}
                                    >
                                        <FontAwesomeIcon icon={faEyeSlash}/>
                                    </button> : <button
                                        className={cx('actionBtn', 'viewBtn')}
                                        title="Ẩn sản phẩm"
                                        onClick={()=>onView(item._id)}
                                    >
                                        <FontAwesomeIcon icon={faEye}/>
                                    </button>
                            }

                            {/* Nút Sửa (Edit) */}
                            <button
                                className={cx('actionBtn', 'editBtn')}
                                title="Sửa"
                                onClick={() => {
                                    handleGetProductUpdate(item);

                                }}
                            >
                                <FontAwesomeIcon icon={faPen}/>
                            </button>

                            {/* Nút Xóa (Delete) */}
                            <button
                                className={cx('actionBtn', 'deleteBtn')}
                                title="Xóa"
                                onClick={() => onDelete && onDelete(item)}
                            >
                                <FontAwesomeIcon icon={faTrashCan}/>
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table