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
exports.configureClient = void 0;
const sdk_1 = require("@lifi/sdk");
const viem_1 = require("viem");
const accounts_1 = require("viem/accounts");
const chains_1 = require("viem/chains");
const chains = [chains_1.arbitrum, chains_1.mainnet, chains_1.optimism, chains_1.polygon, chains_1.scroll];
const configureClient = (privateKey) => {
    const account = (0, accounts_1.privateKeyToAccount)(`0x${privateKey}`);
    const client = (0, viem_1.createWalletClient)({
        account,
        chain: chains_1.mainnet,
        transport: (0, viem_1.http)(),
    });
    (0, sdk_1.createConfig)({
        integrator: 'Bridge Funds',
        providers: [
            (0, sdk_1.EVM)({
                getWalletClient: () => __awaiter(void 0, void 0, void 0, function* () { return client; }),
                switchChain: (chainId) => __awaiter(void 0, void 0, void 0, function* () {
                    // Switch chain by creating a new wallet client
                    return (0, viem_1.createWalletClient)({
                        account,
                        chain: chains.find((chain) => chain.id == chainId),
                        transport: (0, viem_1.http)(),
                    });
                }),
            }),
        ],
    });
    return client;
};
exports.configureClient = configureClient;
