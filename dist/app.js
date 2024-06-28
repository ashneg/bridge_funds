"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.use('/', transactionRoutes_1.default);
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
