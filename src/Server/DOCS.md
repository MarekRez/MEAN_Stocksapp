# API Documentation

This document describes the API endpoints for managing clients and their investment activities in the trading application. Each endpoint allows for different operations, such as retrieving all clients, adding new clients, updating client information, managing investments, and simulating stock portfolios.

| Endpoint                       | Method | Description                                    | Request Parameters                   | Request Body                                                                                                                          | Response                                                                                                     |
|--------------------------------|--------|------------------------------------------------|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| `/api/clients`                 | `GET`  | Retrieve a list of all clients.                | None                                 | None                                                                                                                                  | JSON array of all clients                                                                                    |
| `/api/clients/:email`          | `GET`  | Retrieve a specific client by email.           | `email` (in URL)                     | None                                                                                                                                  | JSON object of the client or 404 error                                                                       |
| `/api/clients`                 | `POST` | Add a new client to the system.                | None                                 | `{ "name": string, "email": string, "bankAccountBalance": number, "investmentAccountBalance": number }`                               | JSON object of the created client                                                                            |
| `/api/clients/:email`          | `PUT`  | Update an existing client's information.       | `email` (in URL)                     | `{ "name"?: string, "bankAccountBalance"?: number, "investmentAccountBalance"?: number }`                                             | JSON object of the updated client or 404 error                                                               |
| `/api/clients/:email`          | `DELETE` | Delete a client from the system by email.     | `email` (in URL)                     | None                                                                                                                                  | Confirmation message or 404 error                                                                            |
| `/api/clients/:email/invest`   | `POST` | Invest a specified amount in a stock for a client. | `email` (in URL)               | `{ "stockSymbol": string, "currency": string, "stockPrice": number, "dividendYield": number, "volatility": number, "expectedReturn": number, "amount": number }` | Success message with updated balance and stock details or error message                                      |
| `/api/clients/:email/sell`     | `POST` | Sell a specified number of shares for a client. | `email` (in URL)                    | `{ "stockSymbol": string, "sharesToSell": number }`                                                                                   | Success message with updated balance and remaining shares or error message                                   |
| `/api/portfolio`               | `POST` | Simulate the performance of a portfolio over months. | None                              | `{ "stocks": [ { "symbol": string, "currency": string, "price": number, "dividendYield": number, "volatility": number, "expectedReturn": number, "totalShares": number } ], "months": number, "showInfo": boolean }` | Simulation results, including stock values over time, or just final balance if `showInfo` is false           |

---

## Endpoint Details

### 1. **GET /api/clients**
- **Description**: Retrieves a list of all clients in the system.
- **Method**: `GET`
- **URL**: `/api/clients`
- **Request Parameters**: None
- **Request Body**: None
- **Response**:
  ```json
  [
    {
      "name": "John Doe",
      "email": "john@example.com",
      "bankAccount": { "iban": "IBAN-1234", "balance": 5000 },
      "investmentAccount": { "balance": 2000, "stocks": [], "investmentHistory": [] }
    }
  ]
  ```

### 2. **GET /api/clients/:email**
- **Description**: Retrieves a specific client by their email.
- **Method**: `GET`
- **URL**: `/api/clients/:email`
- **Request Parameters**:
    - `email` (string) - The email of the client to retrieve.
- **Request Body**: None
- **Response**:
    - Success (200):
      ```json
      {
        "name": "John Doe",
        "email": "john@example.com",
        "bankAccount": { "iban": "IBAN-1234", "balance": 5000 },
        "investmentAccount": { "balance": 2000, "stocks": [], "investmentHistory": [] }
      }
      ```
    - Error (404):
      ```json
      { "error": "Client not found" }
      ```

### 3. **POST /api/clients**
- **Description**: Adds a new client to the system.
- **Method**: `POST`
- **URL**: `/api/clients`
- **Request Parameters**: None
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "bankAccountBalance": 5000,
    "investmentAccountBalance": 2000
  }
  ```
- **Response** (201):
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "bankAccount": { "iban": "IBAN-1234", "balance": 5000 },
    "investmentAccount": { "balance": 2000, "stocks": [], "investmentHistory": [] }
  }
  ```

### 4. **PUT /api/clients/:email**
- **Description**: Updates an existing client’s information.
- **Method**: `PUT`
- **URL**: `/api/clients/:email`
- **Request Parameters**:
    - `email` (string) - The email of the client to update.
- **Request Body**:
  ```json
  {
    "name": "John Smith",
    "bankAccountBalance": 10000,
    "investmentAccountBalance": 3000
  }
  ```
- **Response**:
    - Success (200):
      ```json
      {
        "name": "John Smith",
        "email": "john@example.com",
        "bankAccount": { "iban": "IBAN-1234", "balance": 10000 },
        "investmentAccount": { "balance": 3000, "stocks": [], "investmentHistory": [] }
      }
      ```
    - Error (404):
      ```json
      { "error": "Client not found" }
      ```

### 5. **DELETE /api/clients/:email**
- **Description**: Deletes a client from the system by email.
- **Method**: `DELETE`
- **URL**: `/api/clients/:email`
- **Request Parameters**:
    - `email` (string) - The email of the client to delete.
- **Request Body**: None
- **Response**:
    - Success (200):
      ```json
      { "message": "Client deleted successfully" }
      ```
    - Error (404):
      ```json
      { "error": "Client not found" }
      ```
### 6. **POST /api/clients/:email/invest**
- **Description**: Invests a specified amount in a stock for a client.
- **Method**: `POST`
- **URL**: `/api/clients/:email/invest`
- **Request Parameters**:
    - `email` (string) - The email of the client investing in stock.
- **Request Body**:
  ```json
  {
    "stockSymbol": "AAPL",
    "currency": "USD",
    "stockPrice": 150,
    "dividendYield": 0.02,
    "volatility": 0.3,
    "expectedReturn": 0.05,
    "amount": 1000
  }
---
### 7. **POST /api/clients/:email/sell**
- **Description**: Sells a specified number of shares for a client.
- **Method**: `POST`
- **URL**: `/api/clients/:email/sell`
- **Request Parameters**:
    - `email` (string) - The email of the client selling shares.
- **Request Body**:
  ```json
  {
    "stockSymbol": "AAPL",
    "sharesToSell": 5
  }
This documentation provides an overview of each endpoint and its purpose, including sample request and response formats. It should be useful for understanding and testing the API functionality.
