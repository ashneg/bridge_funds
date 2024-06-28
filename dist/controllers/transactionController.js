"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuotes = getQuotes;
exports.getTransactionStatus = getTransactionStatus;
const models_1 = require("../models/models");
function getQuotes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fromAddress, fromChain, toChain, fromToken, toToken, fromAmount } = req.body;
        try {
            const quotes = yield (0, models_1.fetchQuote)({ fromAddress, fromChain, toChain, fromToken, toToken, fromAmount });
            res.json(quotes);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    });
}
// export async function executeBridgeTransaction(req: Request, res: Response) {
//   const { fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress }: TransactionRequestBody = req.body;
//   try {
//     const transaction = await executeTransaction({ fromChainId, toChainId, fromTokenAddress, toTokenAddress, fromAmount, fromAddress });
//     res.json(transaction);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(500).json({ error: error.message });
//     } else {
//       res.status(500).json({ error: 'Unknown error' });
//     }
//   }
// }
function getTransactionStatus(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { txHash } = req.body;
        try {
            const status = yield (0, models_1.fetchTransactionStatus)({ txHash });
            res.json(status);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ error: error.message });
            }
            else {
                res.status(500).json({ error: 'Unknown error' });
            }
        }
    });
}
