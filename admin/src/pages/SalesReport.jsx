import React, {useEffect, useState} from 'react';
import classNames from "classnames/bind";
import pagesStyles from "../assets/css/Pages.module.scss";
import reportStyles from "../assets/css/SalesReport.module.scss";
import tableStyle from "../assets/css/Table.module.scss";
import Table from "../components/Table.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faChartLine,
    faFileExport,
    faMoneyBillWave,
    faRotateRight,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import CircularProgress from "@mui/material/CircularProgress";

// Import API Service
import * as ReportService from "../services/ReportService";

// IMPORT REDUX
import {useDispatch, useSelector} from "react-redux";
import {setReportData, setTimeRange} from "../redux/reportSlice";

const cxPages = classNames.bind(pagesStyles);
const cx = classNames.bind(reportStyles);
const cxTable = classNames.bind(tableStyle);
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658'];

const SalesReport = () => {
    const dispatch = useDispatch();

    // Lấy state từ Redux thay vì useState
    const timeRange = useSelector(state => state.report.timeRange);
    const reportData = useSelector(state => state.report.data);

    const [isLoading, setIsLoading] = useState(false);

    const fetchReportData = async (range) => {
        try {
            setIsLoading(true);

            const res = await ReportService.getSalesReport(range);
            if (res.status === "OK") {
                dispatch(setReportData(res.data));
            }
        } catch (error) {
            console.error("Lỗi lấy dữ liệu báo cáo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReportData(timeRange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRange]);


    const handleTimeRangeChange = (e) => {
        dispatch(setTimeRange(e.target.value));
    };

    const handleRefresh = () => {
        fetchReportData(timeRange);
    }

    const topProductColumns = [
        {
            header: 'Product Name',
            render: (item) => <div className={cxTable('textClamp', 'nameText')}><strong>{item.name}</strong></div>
        },
        {header: 'Sold', accessor: 'sold', tdClassName: 'centerText'},
        {
            header: 'Revenue',
            render: (item) => <div className={cxTable('priceText')}
                                   style={{color: '#059669'}}>{item.revenue?.toLocaleString() || 0} đ</div>
        }
    ];

    const recentOrderColumns = [
        {header: 'Order ID', render: (item) => <b>{item._id.substring(item._id.length - 6).toUpperCase()}</b>},
        {header: 'Customer', accessor: 'customer'},
        {
            header: 'Total',
            render: (item) => <div className={cxTable('priceText')}>{item.total?.toLocaleString() || 0} đ</div>
        },
        {
            header: 'Status',
            render: (item) => (
                <span style={{
                    color: item.status === 'Delivered' ? 'green' : item.status === 'Cancelled' ? 'red' : 'orange',
                    fontWeight: 'bold'
                }}>
                    {item.status}
                </span>
            )
        }
    ];

    return (
        <div className={cxPages("container")}>
            <div className={cxPages("header")}>
                <div className={cxPages("block-left")}>
                    <h1>Sales & Report</h1>
                    <p>Overview of your store's performance and revenue</p>
                </div>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>

                    <button className={cxPages("add-btn")} onClick={handleRefresh}
                            style={{backgroundColor: '#4b5563', padding: '8px 16px'}}>
                        <FontAwesomeIcon icon={faRotateRight}/>
                    </button>

                    <select
                        value={timeRange}
                        onChange={handleTimeRangeChange}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: '1px solid #d1d5db',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="7days">Last 7 Days</option>
                        <option value="30days">Last 30 Days</option>
                        <option value="year">Last 1 Year</option>
                    </select>

                    <button className={cxPages("add-btn")} style={{backgroundColor: '#10b981'}}>
                        <FontAwesomeIcon icon={faFileExport} style={{marginRight: '8px'}}/> Export
                    </button>
                </div>
            </div>


            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', width: '100%' }}>
                    <CircularProgress size={50} />
                </div>
            ) : (
                <>
                    <div className={cx("kpi-container")}>
                        <div className={cx("kpi-card")}>
                            <div className={cx("kpi-icon")} style={{backgroundColor: '#dbeafe', color: '#2563eb'}}>
                                <FontAwesomeIcon icon={faMoneyBillWave}/></div>
                            <div className={cx("kpi-info")}>
                                <h3>Total Revenue</h3>
                                <p>{reportData.kpi.totalRevenue.toLocaleString()} đ</p>
                            </div>
                        </div>
                        <div className={cx("kpi-card")}>
                            <div className={cx("kpi-icon")} style={{backgroundColor: '#d1fae5', color: '#059669'}}>
                                <FontAwesomeIcon icon={faBoxOpen}/></div>
                            <div className={cx("kpi-info")}>
                                <h3>Total Orders</h3>
                                <p>{reportData.kpi.totalOrders}</p>
                            </div>
                        </div>
                        <div className={cx("kpi-card")}>
                            <div className={cx("kpi-icon")} style={{backgroundColor: '#fef3c7', color: '#d97706'}}>
                                <FontAwesomeIcon icon={faChartLine}/></div>
                            <div className={cx("kpi-info")}>
                                <h3>Products Sold</h3>
                                <p>{reportData.kpi.productsSold}</p>
                            </div>
                        </div>
                        <div className={cx("kpi-card")}>
                            <div className={cx("kpi-icon")} style={{backgroundColor: '#f3e8ff', color: '#9333ea'}}>
                                <FontAwesomeIcon icon={faUsers}/></div>
                            <div className={cx("kpi-info")}>
                                <h3>Customers</h3>
                                <p>{reportData.kpi.totalCustomers}</p>
                            </div>
                        </div>
                    </div>

                    {/* CHARTS */}
                    <div className={cx("charts-container")}>
                        <div className={cx("chart-box")}>
                            <h2>Revenue Trend</h2>
                            {reportData.charts.revenueTrend.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={reportData.charts.revenueTrend}
                                               margin={{top: 5, right: 20, bottom: 5, left: 20}}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb"/>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false}/>
                                        <YAxis axisLine={false} tickLine={false}
                                               tickFormatter={(value) => `${value / 1000000}M`}/>
                                        <Tooltip formatter={(value) => `${value.toLocaleString()} đ`}/>
                                        <Legend/>
                                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3}
                                              dot={{r: 4}} activeDot={{r: 6}} name="Revenue (VND)"/>
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p style={{textAlign: 'center', color: '#9ca3af', marginTop: '100px'}}>No data available</p>
                            )}
                        </div>

                        <div className={cx("chart-box")}>
                            <h2>Sales by Category</h2>
                            {reportData.charts.categoryData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie data={reportData.charts.categoryData} cx="50%" cy="50%" innerRadius={60}
                                             outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value">
                                            {reportData.charts.categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value) => `${value} units`}/>
                                        <Legend verticalAlign="bottom" height={36}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <p style={{textAlign: 'center', color: '#9ca3af', marginTop: '100px'}}>No data available</p>
                            )}
                        </div>
                    </div>

                    {/* TABLES */}
                    <div className={cx("tables-container")}>
                        <div className={cx("chart-box")}>
                            <h2>Top Selling Products</h2>
                            <Table columns={topProductColumns} data={reportData.tables.topProducts} loading={false}/>
                        </div>
                        <div className={cx("chart-box")}>
                            <h2>Recent Transactions</h2>
                            <Table columns={recentOrderColumns} data={reportData.tables.recentOrders} loading={false}/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SalesReport;