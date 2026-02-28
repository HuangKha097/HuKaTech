import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import style from "../assets/css/OrderPage.module.scss";
import tableStyle from "../assets/css/Table.module.scss";
import Table from "../components/Table.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setOrderEdit, setOrders} from "../redux/orderSlice.js";
import {faArrowLeft, faEye} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as OrderService from "../services/OrderService.js";
import OrderDetailPopup from "../components/OrderDetailPopup.jsx";

const cx = classNames.bind(style);
const cxTable = classNames.bind(tableStyle);

const Orders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.list);

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedOrderData, setSelectedOrderData] = useState(null);

    const ITEMS_PER_PAGE = 8;
    const totalItems = orders?.length || 0;
    const pagesCount = Math.ceil(totalItems / ITEMS_PER_PAGE);

    const currentOrders = orders?.slice(
        currentPage * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const [payloadSearch, setPayloadSearch] = useState({
        email: '',
        phone: '',
        status: ''
    });
    const [isShowBackBtn, setIsShowBackBtn] = useState(false);

    useEffect(() => {
        if (!orders || orders.length === 0) {
            setCurrentPage(0);
            return;
        }
        const maxPage = Math.max(Math.ceil(orders.length / ITEMS_PER_PAGE) - 1, 0);
        if (currentPage > maxPage) {
            setCurrentPage(maxPage);
        }
    }, [orders, currentPage]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setIsLoading(true);
                const res = await OrderService.getAllOrder();
                if (res.status === "OK") {
                    dispatch(setOrders(res.data));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [dispatch]);

    // --- CÁC HÀM XỬ LÝ (HANDLERS) ---
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const isConfirm = window.confirm(`Bạn có chắc muốn đổi trạng thái thành ${newStatus}?`);
            if (!isConfirm) return;

            setIsLoading(true);
            const res = await OrderService.updateOrder(orderId, {status: newStatus});

            if (res.status === "OK") {
                const updatedOrders = orders.map(item =>
                    item._id === orderId ? {...item, status: newStatus} : item
                );
                dispatch(setOrders(updatedOrders));
                alert("Cập nhật trạng thái thành công!");
            }
        } catch (error) {
            alert("Lỗi khi cập nhật trạng thái");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangeInput = (e) => {
        const {name, value} = e.target;
        setPayloadSearch((prevState) => ({...prevState, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const res = await OrderService.searchOrder(payloadSearch);
            if (res.status === "OK") {
                dispatch(setOrders(res.data));
                setIsShowBackBtn(true);
                setCurrentPage(0);
            }
        } catch (error) {
            alert("Lỗi khi tìm kiếm đơn hàng");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = async () => {
        setPayloadSearch({email: '', phone: '', status: ''});
        setIsShowBackBtn(false);
        setCurrentPage(0);
        try {
            setIsLoading(true);
            const res = await OrderService.getAllOrder();
            if (res.status === "OK") {
                dispatch(setOrders(res.data));
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm Xem chi tiết (Đã gộp Redux và Logic mở Popup)
    const handleViewDetail = async (order) => {
        try {
            setIsLoading(true);
            dispatch(setOrderEdit(order)); // Vẫn lưu vào Redux

            // Gọi API getOrderDetails mới viết bên backend
            const res = await OrderService.getOrderDetails(order._id);
            if (res.status === "OK") {
                setSelectedOrderData(res.data); // Lưu dữ liệu chi tiết vào state
                setIsPopupOpen(true); // Mở Modal lên
            } else {
                alert("Không thể lấy chi tiết đơn hàng!");
            }
        } catch (error) {
            console.error("Lỗi khi xem chi tiết:", error);
            alert("Đã xảy ra lỗi hệ thống");
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm đóng Popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setSelectedOrderData(null);
    };

    // --- CẤU HÌNH CỘT CHO BẢNG ĐƠN HÀNG ---
    const orderColumns = [
        {
            header: 'Order ID',
            render: (item) => <b>{item._id.substring(item._id.length - 6).toUpperCase()}</b>
        },
        {
            header: 'Customer',
            render: (item) => <div className={cxTable('textClamp', 'nameText')}>{item.name}</div>
        },
        {
            header: 'Contact Info',
            render: (item) => (
                <>
                    <div>{item.email}</div>
                    <div style={{color: "#6b7280", fontSize: "1.2rem"}}>{item.phone}</div>
                </>
            )
        },
        {header: 'City', accessor: 'city'},
        {header: 'Pay Method', accessor: 'payMethod', tdClassName: 'centerText'},
        {
            header: 'Status',
            render: (item) => (
                <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    style={{
                        padding: '0.5rem',
                        borderRadius: '4px',
                        border: '1px solid #d1d5db',
                        fontWeight: 'bold',
                        outline: 'none',
                        color: item.status === 'Cancelled' ? 'red' : item.status === 'Delivered' ? 'green' : 'black'
                    }}
                >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            )
        },
        {
            header: 'Action',
            className: 'actionCol',
            render: (item) => (
                <div className={cxTable('actionGroup')}>
                    <button
                        className={cxTable('actionBtn', 'viewBtn')}
                        title="Xem chi tiết"
                        onClick={() => handleViewDetail(item)}
                    >
                        <FontAwesomeIcon icon={faEye}/>
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <div className={cx("block-left")}>
                    <h1>Orders Management</h1>
                    <p>Manage customer orders and processing status</p>
                </div>
            </div>

            <form className={cx("filter-block")} onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Email
                    <input type="text" id="email" name="email" value={payloadSearch.email} onChange={handleChangeInput}
                           placeholder="Search by Email..."/>
                </label>
                <label htmlFor="phone">
                    Phone
                    <input type="text" id="phone" name="phone" value={payloadSearch.phone} onChange={handleChangeInput}
                           placeholder="Search by Phone..."/>
                </label>
                <label htmlFor="select-status">
                    Status
                    <select name="status" value={payloadSearch.status} id="select-status" onChange={handleChangeInput}>
                        <option value="">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </label>
                <button type="submit" className={cx("search-btn")}>Search</button>
            </form>

            <div className={cx("table-block")}>
                <Table columns={orderColumns} data={currentOrders} loading={isLoading}/>
            </div>

            <div className={cx("footer-btn")}>
                {isShowBackBtn && (
                    <button className={cx("back-btn")} type="button" onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                        Back to all orders
                    </button>
                )}
                <div className={cx("pages-btn")}>
                    {Array.from({length: pagesCount}).map((_, index) => (
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

            {/* Component Popup Chi Tiết */}
            <OrderDetailPopup
                isOpen={isPopupOpen}
                onClose={closePopup}
                order={selectedOrderData}
            />
        </div>
    );
};

export default Orders;