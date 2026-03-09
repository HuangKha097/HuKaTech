import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/Pages.module.scss";
import tableStyle from "../assets/css/Table.module.scss";
import Table from "../components/Table.jsx";
import { useNavigate } from "react-router-dom";
import { faArrowLeft, faPen, faTrashCan, faRotateRight } from "@fortawesome/free-solid-svg-icons"; // Thêm icon refresh
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as CustomerService from "../services/CustomerService";

import { useDispatch, useSelector } from "react-redux";
import { setCustomers, setCustomerEdit } from "../redux/customerSlice";

const cx = classNames.bind(style);
const cxTable = classNames.bind(tableStyle);

const Customers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const customers = useSelector(state => state.customers.list);

    const [isLoading, setIsLoading] = useState(false);

    // State phân trang
    const [currentPage, setCurrentPage] = useState(0);
    const ITEMS_PER_PAGE = 8;
    const totalItems = customers?.length || 0;
    const pagesCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const currentCustomers = customers?.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    // State tìm kiếm
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isShowBackBtn, setIsShowBackBtn] = useState(false);

    useEffect(() => {
        if (!customers || customers.length === 0) {
            setCurrentPage(0);
            return;
        }
        const maxPage = Math.max(Math.ceil(customers.length / ITEMS_PER_PAGE) - 1, 0);
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [customers, currentPage]);


    const fetchCustomers = async () => {
        try {
            setIsLoading(true);
            const res = await CustomerService.getAllCustomers();
            if (res && res.status === "OK") {
                dispatch(setCustomers(res.data));
            }
        } catch (e) {
            console.error("Lỗi khi lấy dữ liệu khách hàng:", e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [dispatch]);

    // --- CÁC HÀM XỬ LÝ ---

    const handleDeleteCustomer = async (customerId) => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn xóa thông tin khách hàng này?");
        if (!isConfirm) return;

        try {
            const res = await CustomerService.deleteCustomer(customerId);
            if (res && res.status === "OK") {
                // Cập nhật lại Redux Store sau khi xóa
                const updatedList = customers.filter(item => item._id !== customerId);
                dispatch(setCustomers(updatedList));
                alert("Xóa khách hàng thành công!");
            } else {
                alert("Xóa thất bại!");
            }
        } catch (error) {
            alert("Có lỗi xảy ra khi xóa!");
            console.error(error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await CustomerService.searchCustomers({ keyword: searchKeyword });
            if (res && res.status === "OK") {
                dispatch(setCustomers(res.data));
                setIsShowBackBtn(true);
                setCurrentPage(0);
            }
        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        setSearchKeyword('');
        setIsShowBackBtn(false);
        setCurrentPage(0);
        fetchCustomers();
    };

    const customerColumns = [
        {
            header: 'Customer Name',
            className: 'nameCol',
            render: (item) => <div className={cxTable('textClamp', 'nameText')}><strong>{item.name}</strong></div>
        },
        {
            header: 'Phone Number',
            className: 'phoneCol',
            render: (item) => <div className={cxTable('textClamp')}>{item.phone}</div>
        },
        {
            header: 'Email',
            className: 'emailCol',
            render: (item) => (
                <div className={cxTable('textClamp')} style={{ color: item.email ? 'inherit' : '#9ca3af', fontStyle: item.email ? 'normal' : 'italic' }}>
                    {item.email || 'Chưa cung cấp'}
                </div>
            )
        },
        {
            header: 'Address',
            className: 'addressCol',
            render: (item) => <div className={cxTable('textClamp')}>{item.address || 'Chưa cung cấp'}</div>
        },
        {
            header: 'Total Orders',
            className: 'ordersCol',
            render: (item) => (
                <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#374151' }}>
                    {item.totalOrders || 0}
                </div>
            )
        },
        {
            header: 'Total Spent',
            className: 'spentCol',
            render: (item) => (
                <div className={cxTable('priceText')} style={{ color: '#059669' }}>
                    {item.totalSpent ? `${item.totalSpent.toLocaleString()} đ` : '0 đ'}
                </div>
            )
        },
        {
            header: 'Action',
            className: 'actionCol',
            render: (item) => (
                <div className={cxTable('actionGroup')}>

                    <button
                        className={cxTable('actionBtn', 'deleteBtn')}
                        title="Xóa thông tin"
                        onClick={() => handleDeleteCustomer(item._id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            )
        }
    ];
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Customers Info</h1>
                    <p>Manage buyer's contact and delivery information</p>
                </div>
                <button className={cx("add-btn")} onClick={fetchCustomers} style={{ backgroundColor: '#4b5563' }}>
                    <FontAwesomeIcon icon={faRotateRight} style={{ marginRight: '8px' }}/>
                    Refresh Data
                </button>
            </div>

            <form className={cx("filter-block")} style={{ gap: "5rem" }} onSubmit={handleSubmit}>
                <label htmlFor="search" style={{ flex: 1 }} >
                    Search Customers
                    <input
                        type="text"
                        id="search"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        placeholder="Search by name or phone number..."
                    />
                </label>
                <button type="submit" className={cx("add-btn", "search-btn")}>Search</button>
            </form>

            <div className={cx("table-block")}>
                <Table columns={customerColumns} data={currentCustomers} loading={isLoading} />
            </div>

            <div className={cx("footer-btn")}>
                {isShowBackBtn && (
                    <button className={cx("back-btn")} type="button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Back to all records
                    </button>
                )}
                <div className={cx("pages-btn")}>
                    {Array.from({ length: pagesCount }).map((_, index) => (
                        <button
                            key={index}
                            className={cx("page-btn", currentPage === index && "active")}
                            type="button"
                            onClick={() => setCurrentPage(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Customers;