
# bridge_funds

You can bridge funds (any token) from any evm chain supported by `viem` i.e Eth(mainnet), arb, op, mantle etc.

## Setup

- docker build -t bridge_funds .
- docker run -p 3001:3001 bridge_funds

## Bridge Funds 
1. Send a post request to `/setup_client`
	- Enshure that you set correct chain id (form which the funds need to be bridged)
2. Send a post request to `/execute_transaction` 
	- Enshure that `fromChainId` is same as `chainId` which was applied in previous request if not call execute previous step with updated chain id.

## Endpoints

### 1. Setup Wallet Client

Endpoint: `/setup_client`

Method: `POST`

Description: This endpoint allows users to create wallet. 

Request body:
```json
{
    "privateKey":"yourPrivateKey",
    "chainId": 10 // optimism chain id (can set it any evm chain)
}
```

Response body:
```json
{
    "message": "Client configured successfully",
    "client": {
	// wallet client details
	}
}
```

### 2. Execute Transaction

Endpoint: `/execute_transaction`

Method: `POST`

Description: Used to bridge funds

Query parameters:
- `fromChainId`: Wallet client active chain.
- `toChainId`: Id of the chain on which funds need to be transfered to.
- `fromTokenAddress`: Token which will be consumed on bridge .
- `toTokenAddress`: Token which will recived after bridging .
- `fromAmount`: Token which will be used to bridge .
- `fromAddress`: Token which will be used to bridge .

Request body:
```json
{
    "fromChainId": 10, // Op
    "toChainId": 5000, // Mantle
    "fromTokenAddress": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // USDC on Optimism
    "toTokenAddress": "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9", // USDC on mantle
    "fromAmount": "5000000", // 5 USDC
    "fromAddress": "yourWalletAddress"
}
```

### 3. Get Transaction Status

Endpoint: `/transaction_status`

Method: `POST`

Description: This endpoint allows users to get the transaction history of a specific address on a chain.

Query parameters:
- `txHash`: Transaction Hash of any bridge event


Request body:
```json
{
    "txHash":"0xdaf7623344476036d59c08b743c8df7688b722c760164ce76529b72da890efc9"
}
```


## Improvements and Insights

- Uses intent based bridging which is cost effective and provides multiple ways to bridge (can be useful in case of congestion).
- First api can be easily integrated with wagmi, hence not requiring private key as a param (just signature needed).