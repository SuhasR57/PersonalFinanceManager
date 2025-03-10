import React, { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Analytics from "./Analytics";
import TableData from "./TableData";
import Spinner from "../../components/Spinner";
import AddTransaction from "./AddTransaction";
import { getTransactions } from "../../utils/ApiRequest";
import axios from "axios";
import "./ExpenseTracker.css";
import moment from "moment";
import { saveAs } from "file-saver"; // For downloading files

const ExpenseTracker = () => {
    const navigate = useNavigate();

    const [cUser, setcUser] = useState();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [frequency, setFrequency] = useState("7");
    const [type, setType] = useState("all");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [view, setView] = useState("table");

    const handleStartChange = (date) => {
        setStartDate(date);
    };

    const handleEndChange = (date) => {
        setEndDate(date);
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (localStorage.getItem("user")) {
                const user = JSON.parse(localStorage.getItem("user"));
                setcUser(user);
                setRefresh(true);
            } else {
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    const handleChangeFrequency = (e) => {
        setFrequency(e.target.value);
    };

    const handleSetType = (e) => {
        setType(e.target.value);
    };

    const handleReset = () => {
        setType("all");
        setStartDate(null);
        setEndDate(null);
        setFrequency("7");
    };

    const handleTableClick = () => {
        setView("table");
    };

    const handleChartClick = () => {
        setView("chart");
    };

    const handleBackToHome = () => {
        navigate("/");
    };

    const refreshTransactions = () => {
        setRefresh(!refresh);
    };

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(getTransactions, {
                userId: cUser._id,
                type,
                frequency,
                startDate: startDate ? moment(startDate).format("YYYY-MM-DD") : null,
                endDate: endDate ? moment(endDate).format("YYYY-MM-DD") : null,
            });

            if (data.success) {
                setTransactions(data.transactions);
            } else {
                console.error("Failed to fetch transactions:", data.message);
            }
        } catch (err) {
            console.error("Error fetching transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    // Function to download transactions report as CSV
    const downloadReport = () => {
        // Create CSV content
        const headers = ["Date", "Title", "Amount", "Type", "Category", "Description"];
        const rows = transactions.map((transaction) => [
            moment(transaction.date).format("YYYY-MM-DD"),
            transaction.title,
            transaction.amount,
            transaction.transactionType,
            transaction.category,
            transaction.description,
        ]);

        const csvContent = [
            headers.join(","), // Header row
            ...rows.map((row) => row.join(",")), // Data rows
        ].join("\n");

        // Create a Blob and trigger download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `transactions_report_${moment().format("YYYYMMDD_HHmmss")}.csv`);
    };

    useEffect(() => {
        if (cUser) {
            fetchTransactions();
        }
    }, [refresh, frequency, endDate, type, startDate, cUser]);

    return (
        <>
            <div
                style={{
                    position: "relative",
                    minHeight: "100vh",
                    backgroundImage: `url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    <Container
                        style={{ position: "relative", zIndex: 2, color: "white" }}
                        className="mt-3"
                    >
                        {/* Back Button */}
                        <Button
                            variant="secondary"
                            onClick={handleBackToHome}
                            className="back-button"
                        >
                            Back to Home
                        </Button>

                        <h1 className="text-center mb-4">Expense Tracker</h1>

                        {/* Filters */}
                        <div className="filterRow">
                            <div>
                                <Button onClick={handleShow} className="addNew">
                                    Add New
                                </Button>
                            </div>
                            <div className="text-white">
                                <Form.Group className="mb-3" controlId="formSelectFrequency">
                                    <Form.Label>Select Frequency</Form.Label>
                                    <Form.Select
                                        name="frequency"
                                        value={frequency}
                                        onChange={handleChangeFrequency}
                                    >
                                        <option value="7">Last Week</option>
                                        <option value="30">Last Month</option>
                                        <option value="365">Last Year</option>
                                        <option value="custom">Custom</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="text-white type">
                                <Form.Group className="mb-3" controlId="formSelectFrequency">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select name="type" value={type} onChange={handleSetType}>
                                        <option value="all">All</option>
                                        <option value="expense">Expense</option>
                                        <option value="credit">Credit</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div>
                                <Button onClick={handleReset} className="resetBtn">
                                    Reset Filter
                                </Button>
                            </div>
                            <div className="text-white iconBtnBox">
                                <FormatListBulletedIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={handleTableClick}
                                    className={`${view === "table" ? "iconActive" : "iconDeactive"
                                        }`}
                                />
                                <BarChartIcon
                                    sx={{ cursor: "pointer" }}
                                    onClick={handleChartClick}
                                    className={`${view === "chart" ? "iconActive" : "iconDeactive"
                                        }`}
                                />
                            </div>
                        </div>

                        {/* Download Report Button */}
                        <div className="text-center mb-4">
                            <Button variant="success" onClick={downloadReport}>
                                Download Report (CSV)
                            </Button>
                        </div>

                        <AddTransaction
                            show={show}
                            handleClose={handleClose}
                            refreshTransactions={refreshTransactions}
                            userId={cUser?._id}
                        />

                        {/* Custom Date Range */}
                        {frequency === "custom" && (
                            <div className="date">
                                <div className="form-group">
                                    <label htmlFor="startDate" className="text-white">
                                        Start Date:
                                    </label>
                                    <div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleStartChange}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endDate" className="text-white">
                                        End Date:
                                    </label>
                                    <div>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={handleEndChange}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Display Table or Analytics */}
                        {loading ? (
                            <Spinner />
                        ) : view === "table" ? (
                            <TableData data={transactions} user={cUser} />
                        ) : (
                            <Analytics transactions={transactions} />
                        )}

                        <ToastContainer />
                    </Container>
                </div>
            </div>
        </>
    );
};

export default ExpenseTracker;