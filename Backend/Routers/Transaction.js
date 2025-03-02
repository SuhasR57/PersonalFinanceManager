import express from 'express';
import {
    addTransactionController,
    deleteTransactionController,
    getAllTransactionController,
    updateTransactionController,
    deleteMultipleTransactionsController, // New controller for multi-deletion
    getSingleTransactionController, // New controller for fetching a single transaction
} from '../Controllers/transactionController.js';

const router = express.Router();


router.route("/addTransaction").post(addTransactionController);


router.route("/getTransaction").post(getAllTransactionController);


router.route("/deleteTransaction/:id").post(deleteTransactionController);

// Delete multiple transactions
router.route("/deleteMultipleTransactions").post(deleteMultipleTransactionsController); // New route

// Update a transaction
router.route('/updateTransaction/:id').put(updateTransactionController);

// Fetch a single transaction
router.route("/getTransaction/:id").get(getSingleTransactionController); // New route

export default router;