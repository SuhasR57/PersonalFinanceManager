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
import "./ExpenseTracker.css";

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


    const mockGetTransactions = async () => {
        try {
            setLoading(true);


            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mocked transactions data
            const mockTransactions = [
                {
                    _id: "1",
                    title: "Groceries",
                    amount: 50,
                    description: "Weekly groceries",
                    category: "Groceries",
                    date: "2023-10-01",
                    transactionType: "expense",
                },
                {
                    _id: "2",
                    title: "Salary",
                    amount: 2000,
                    description: "Monthly salary",
                    category: "Salary",
                    date: "2023-10-05",
                    transactionType: "credit",
                },
            ];

            setTransactions(mockTransactions);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    // Add a new transaction locally
    const addTransactionLocally = (newTransaction) => {
        setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    };

    useEffect(() => {
        if (cUser) {
            mockGetTransactions();
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


                        <AddTransaction
                            show={show}
                            handleClose={handleClose}
                            refreshTransactions={refreshTransactions}
                            userId={cUser?._id}
                            addTransactionLocally={addTransactionLocally}
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