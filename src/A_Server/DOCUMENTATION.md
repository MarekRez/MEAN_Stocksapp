# API Documentation

This document describes the API endpoints for managing clients and their investment activities in the trading application. Each endpoint allows for different operations, such as retrieving all clients, adding new clients, updating client information, managing investments, and simulating stock portfolios.

---

## Endpoints Overview

| **Endpoint**                        | **Method** | **Description**                                        | **Request Parameters** | **Request Body**                                                                                       | **Response**                                                               |
|-------------------------------------|------------|--------------------------------------------------------|-------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `/api/clients`                      | GET        | Retrieve a list of all clients.                       | None                    | None                                                                                                  | JSON array of all clients                                                  |
| `/api/clients/:email`               | GET        | Retrieve a specific client by email.                  | `email` (in URL)        | None                                                                                                  | JSON object of the client or 404 error                                     |
| `/api/clients`                      | POST       | Add a new client to the system.                       | None                    | `{ "name": string, "email": string, "bankAccountBalance": number, "investmentAccountBalance": number }`| JSON object of the created client                                          |
| `/api/clients/:email`               | PUT        | Update an existing client's information.              | `email` (in URL)        | `{ "name"?: string, "bankAccountBalance"?: number, "investmentAccountBalance"?: number }`             | JSON object of the updated client or 404 error                             |
| `/api/clients/:email`               | DELETE     | Delete a client from the system by email.             | `email` (in URL)        | None                                                                                                  | Confirmation message or 404 error                                          |
| `/api/clients/:email/invest`        | POST       | Invest a specified amount in a stock for a client.    | `email` (in URL)        | `{ "stockSymbol": string, "currency": string, "stockPrice": number, "dividendYield": number, "volatility": number, "expectedReturn": number, "amount": number }`| Success message with updated balance and stock details or error message |
| `/api/clients/:email/sell`          | POST       | Sell a specified number of shares for a client.       | `email` (in URL)        | `{ "stockSymbol": string, "sharesToSell": number }`                                                   | Success message with updated balance and remaining shares or error message |
| `/api/portfolio`                    | POST       | Simulate the performance of a portfolio over months.  | None                    | `{ "stocks": [ { "symbol": string, "currency": string, "price": number, "dividendYield": number, "volatility": number, "expectedReturn": number, "totalShares": number } ], "months": number, "showInfo": boolean }`| Simulation results or final balance                                        |
| `/api/client/stocks`                | GET        | Retrieve a list of all client stocks.                 | None                    | None                                                                                                  | JSON array of all client stocks                                            |
| `/api/clients/:iban/bank/deposit`   | POST       | Deposit money into a client's bank account.           | `iban` (in URL)         | `{ "amount": number }`                                                                                | Success message with updated balance or error message                      |
| `/api/clients/:iban/bank/withdraw`  | POST       | Withdraw money from a client's bank account.          | `iban` (in URL)         | `{ "amount": number }`                                                                                | Success message with updated balance or error message                      |
| `/api/clients/:iban/investment/deposit` | POST    | Deposit money into a client's investment account.     | `iban` (in URL)         | `{ "amount": number }`                                                                                | Success message with updated balance or error message                      |
| `/api/clients/:iban/investment/withdraw` | POST   | Withdraw money from a client's investment account.    | `iban` (in URL)         | `{ "amount": number }`                                                                                | Success message with updated balance or error message                      |
| `/api/clients/exists/:email`        | GET        | Check if a client exists by email.                    | `email` (in URL)        | None                                                                                                  | JSON object indicating whether the client exists                           |
| `/api/clients/:email/investment/history` | GET   | Retrieve the investment history of a client.          | `email` (in URL)        | None                                                                                                  | JSON array of the client's investment history or error message             |

---

## Endpoint Details

### 1. GET `/api/clients`

- **Description**: Retrieves a list of all clients in the system.
- **Method**: GET
- **URL**: `/api/clients`
- **Request Parameters**: None
- **Request Body**: None
- **Response**:
  ```json
  [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "iban": "IBAN-1234",
      "bankAccountBalance": 5000,
      "investmentAccountBalance": 2000
    }
  ]
2. GET /api/clients/:email
   Description: Retrieves a specific client by their email.
   Method: GET
   URL: /api/clients/:email
   Request Parameters:
   email (string) - The email of the client to retrieve.
   Request Body: None
   Response:
   Success (200):
   {
   "name": "John Doe",
   "email": "john@example.com",
   "bankAccountBalance": 5000,
   "investmentAccountBalance": 2000
   }
   Error (404):
   { "error": "Client not found" }
3. POST /api/clients
   Description: Adds a new client to the system.
   Method: POST
   URL: /api/clients
   Request Parameters: None
   Request Body:
   {
   "name": "John Doe",
   "email": "john@example.com",
   "bankAccountBalance": 5000,
   "investmentAccountBalance": 2000
   }
   Response (201):
   {
   "name": "John Doe",
   "email": "john@example.com",
   "bankAccountBalance": 5000,
   "investmentAccountBalance": 2000
   }
4. PUT /api/clients/:email
   Description: Updates an existing client’s information.
   Method: PUT
   URL: /api/clients/:email
   Request Parameters:
   email (string) - The email of the client to update.
   Request Body:
   {
   "name": "John Smith",
   "bankAccountBalance": 10000,
   "investmentAccountBalance": 3000
   }
   Response:
   Success (200):
   {
   "name": "John Smith",
   "email": "john@example.com",
   "bankAccountBalance": 10000,
   "investmentAccountBalance": 3000
   }
   Error (404):
   { "error": "Client not found" }
5. DELETE /api/clients/:email
   Description: Deletes a client from the system by email.
   Method: DELETE
   URL: /api/clients/:email
   Request Parameters:
   email (string) - The email of the client to delete.
   Request Body: None
   Response:
   Success (200):
   { "message": "Client deleted successfully" }
   Error (404):
   { "error": "Client not found" }
6. POST /api/clients/:email/invest
   Description: Invests a specified amount in a stock for a client.
   Method: POST
   URL: /api/clients/:email/invest
   Request Parameters:
   email (string) - The email of the client investing in stock.
   Request Body:
   {
   "stockSymbol": "AAPL",
   "currency": "USD",
   "stockPrice": 150,
   "dividendYield": 0.02,
   "volatility": 0.3,
   "expectedReturn": 0.05,
   "amount": 1000
   }
   Response:
   Success (200):
   {
   "message": "Investment successful",
   "balance": 3000,
   "leftover": 0,
   "stock": {
   "symbol": "AAPL",
   "shares": 10,
   "stockPrice": 150
   }
   }
   Error (400):
   { "error": "Investment failed: Insufficient balance or unable to buy shares" }
7. POST /api/clients/:email/sell
   Description: Sells a specified number of shares for a client.
   Method: POST
   URL: /api/clients/:email/sell
   Request Parameters:
   email (string) - The email of the client selling shares.
   Request Body:
   {
   "stockSymbol": "AAPL",
   "sharesToSell": 5
   }
   Response:
   Success (200):
   {
   "message": "Shares sold successfully",
   "balance": 3500,
   "stock": {
   "symbol": "AAPL",
   "remainingShares": 5,
   "stockPrice": 150
   }
   }
   Error (400):
   { "error": "Invalid sell data" }
8. POST /api/portfolio
   Description: Simulates the performance of a portfolio over months.
   Method: POST
   URL: /api/portfolio
   Request Parameters: None
   Request Body:
   {
   "stocks": [
   {
   "symbol": "AAPL",
   "currency": "USD",
   "price": 150,
   "dividendYield": 0.02,
   "volatility": 0.3,
   "expectedReturn": 0.05,
   "totalShares": 10
   }
   ],
   "months": 12,
   "showInfo": true
   }
   Response:
   Success (200):
   {
   "message": "Simulated portfolio over 12 months",
   "details": [
   {
   "month": 1,
   "stockValues": [
   {
   "symbol": "AAPL",
   "value": 155
   }
   ]
   }
   ]
   }
   Error (400):
   { "error": "Invalid simulation data" }
9. GET /api/client/stocks
   Description: Retrieves a list of all client stocks.
   Method: GET
   URL: /api/client/stocks
   Request Parameters: None
   Request Body: None
   Response:
   [
   {
   "email": "john@example.com",
   "stockSymbol": "AAPL",
   "shares": 10
   }
   ]
10. POST /api/clients/:iban/bank/deposit
    Description: Deposits money into a client's bank account.
    Method: POST
    URL: /api/clients/:iban/bank/deposit
    Request Parameters:
    iban (string) - The IBAN of the client's bank account.
    Request Body:
    {
    "amount": 1000
    }
    Response:
    Success (200):
    {
    "message": "Deposited 1000.00 successfully",
    "bankAccountBalance": 6000
    }
    Error (400):
    { "error": "Invalid deposit amount" }
11. POST /api/clients/:iban/bank/withdraw
    Description: Withdraws money from a client's bank account.
    Method: POST
    URL: /api/clients/:iban/bank/withdraw
    Request Parameters:
    iban (string) - The IBAN of the client's bank account.
    Request Body:
    {
    "amount": 500
    }
    Response:
    Success (200):
    {
    "message": "Withdrawn 500.00 successfully",
    "bankAccountBalance": 4500
    }
    Error (400):
    { "error": "Invalid withdrawal amount" }
12. POST /api/clients/:iban/investment/deposit
    Description: Deposits money into a client's investment account.
    Method: POST
    URL: /api/clients/:iban/investment/deposit
    Request Parameters:
    iban (string) - The IBAN of the client's bank account.
    Request Body:
    {
    "amount": 1000
    }
    Response:
    Success (200):
    {
    "message": "Deposited 1000.00 successfully to investment account",
    "investmentAccountBalance": 3000
    }
    Error (400):
    { "error": "Invalid deposit amount" }
13. POST /api/clients/:iban/investment/withdraw
    Description: Withdraws money from a client's investment account.
    Method: POST
    URL: /api/clients/:iban/investment/withdraw
    Request Parameters:
    iban (string) - The IBAN of the client's bank account.
    Request Body:
    {
    "amount": 500
    }
    Response:
    Success (200):
    {
    "message": "Withdrawn 500.00 successfully from investment account",
    "investmentAccountBalance": 1500
    }
    Error (400):
    { "error": "Invalid withdrawal amount" }
14. GET /api/clients/exists/:email
    Description: Checks if a client exists by email.
    Method: GET
    URL: /api/clients/exists/:email
    Request Parameters:
    email (string) - The email of the client to check.
    Request Body: None
    Response:
    {
    "exists": true
    }
15. GET /api/clients/:email/investment/history
    Description: Retrieves the investment history of a client.
    Method: GET
    URL: /api/clients/:email/investment/history
    Request Parameters:
    email (string) - The email of the client.
    Request Body: None
    Response:
    Success (200):
    {
    "history": [
    {
    "stockSymbol": "AAPL",
    "amount": 1000,
    "date": "2023-01-01"
    }
    ]
    }
    Error (404):
    { "error": "Client not found" }