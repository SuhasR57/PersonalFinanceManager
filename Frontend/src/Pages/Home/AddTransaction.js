import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { addTransaction } from "../../utils/ApiRequest"; // Import the API endpoint

const AddTransaction = ({ show, handleClose, refreshTransactions, userId }) => {
    const [values, setValues] = useState({
        title: "",
        amount: "",
        description: "",
        category: "",
        date: "",
        transactionType: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, amount, description, category, date, transactionType } = values;

        // Validate inputs
        if (!title || !amount || !description || !category || !date || !transactionType) {
            toast.error("Please fill in all fields", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        setLoading(true);

        try {
            // Prepare request body
            const requestBody = {
                title,
                amount,
                description,
                category,
                date,
                transactionType,
                userId,
            };

            console.log("Request Body:", requestBody); // Debugging

            // Make API call to add transaction
            const { data } = await axios.post(addTransaction, requestBody);

            console.log("API Response:", data); // Debugging

            if (data.success) {
                toast.success("Transaction added successfully!", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                handleClose();
                refreshTransactions(); // Refresh the transactions list
            } else {
                toast.error(data.message || "Failed to add transaction", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error("Error adding transaction:", error);

            // Display a user-friendly error message
            if (error.response) {
                // Server responded with an error status code (e.g., 400, 500)
                toast.error(
                    error.response.data.message || "Failed to add transaction. Please try again.",
                    {
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                );
            } else if (error.request) {
                // The request was made but no response was received
                toast.error("Network error. Please check your connection.", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                // Something else caused the error
                toast.error("An unexpected error occurred. Please try again.", {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Add Transaction Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Enter Transaction Name"
                            value={values.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            name="amount"
                            type="number"
                            placeholder="Enter your Amount"
                            value={values.amount}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSelect">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                        >
                            <option value="">Choose...</option>
                            <option value="Groceries">Groceries</option>
                            <option value="Rent">Rent</option>
                            <option value="Salary">Salary</option>
                            <option value="Tip">Tip</option>
                            <option value="Food">Food</option>
                            <option value="Medical">Medical</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Enter Description"
                            value={values.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formSelect1">
                        <Form.Label>Transaction Type</Form.Label>
                        <Form.Select
                            name="transactionType"
                            value={values.transactionType}
                            onChange={handleChange}
                        >
                            <option value="">Choose...</option>
                            <option value="credit">Credit</option>
                            <option value="expense">Expense</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={values.date}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTransaction;