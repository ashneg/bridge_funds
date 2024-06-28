"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = require("../controllers/transactionController");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send('API is running');
});
router.post('/setup_client', transactionController_1.setupClient);
router.post('/get_quotes', transactionController_1.getQuotes);
// router.post('/execute_transaction', executeBridgeTransaction);
router.post('/transaction_status', transactionController_1.getTransactionStatus);
exports.default = router;
