import React from 'react';
import classNames from 'classnames/bind';
import styles from '../assets/css/Table.module.scss';
import CircularProgress from "@mui/material/CircularProgress";

const cx = classNames.bind(styles);

/**
 * @param {Array} columns - Mảng cấu hình cột [{ header: 'Name', accessor: 'name', render: (row) => JSX, className: 'nameCol' }]
 * @param {Array} data - Mảng dữ liệu cần hiển thị
 * @param {Boolean} loading - Trạng thái loading
 */
const Table = ({ columns = [], data = [], loading }) => {
    return (
        <table className={cx('table')}>
            <thead className={cx('thead')}>
            <tr>
                {columns.map((col, index) => (
                    <th key={index} className={cx('th', col.className)}>
                        {col.header}
                    </th>
                ))}
            </tr>
            </thead>

            <tbody>
            {loading ? (
                <tr>
                    <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
                        <CircularProgress />
                    </td>
                </tr>
            ) : data.length > 0 ? (
                data.map((item, rowIndex) => (
                    <tr key={item._id || rowIndex} className={cx('row')}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className={cx('td', col.tdClassName)}>
                                {/* Nếu có hàm render custom thì gọi hàm đó, nếu không thì lấy giá trị trực tiếp từ object */}
                                {col.render ? col.render(item) : item[col.accessor] || '-'}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
                        Không có dữ liệu
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default Table;