import classNames from 'classnames/bind'
import styles from '../assets/css/Table.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPen, faPlus, faRemove, faTrashCan} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

const getProductImage = (item) => {
    if (item.images?.length && item.images[0].url) {
        return item.images[0].url
    }
    if (item.image) {
        return `data:image/jpeg;base64,${item.image}`
    }
    return 'https://via.placeholder.com/60'
}

// Bạn có thể truyền thêm các hàm xử lý sự kiện vào props
const Table = ({ data = [], onEdit, onDelete, onView, onAdd }) => {
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
                            {/* Nút Thêm (Add) */}
                            <button
                                className={cx('actionBtn', 'addBtn')}
                                title="Thêm"
                                onClick={() => onAdd && onAdd(item)}
                            >
                                <FontAwesomeIcon icon={faPlus}/>
                            </button>

                            {/* Nút Chi tiết (View) */}
                            <button
                                className={cx('actionBtn', 'viewBtn')}
                                title="Chi tiết"
                                onClick={() => onView && onView(item)}
                            >
                                <FontAwesomeIcon icon={faEye}/>
                            </button>

                            {/* Nút Sửa (Edit) */}
                            <button
                                className={cx('actionBtn', 'editBtn')}
                                title="Sửa"
                                onClick={() => onEdit && onEdit(item)}
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