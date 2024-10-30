# Documentation for `src` Folder

## `src/Server/Server.ts`
This file sets up an Express server to handle various API endpoints related to clients and their investments.

- **Imports**:
    - `express`, `Request`, `Response`: For setting up the server and handling HTTP requests and responses.
    - Various classes and enums from the `Classes` and `Enums` directories.

- **Server Setup**:
    - Creates an Express application.
    - Sets the server to listen on port 3000.
    - Defines a base API path `/api`.

- **Middleware**:
    - `express.json()`: Parses incoming JSON requests.

- **Routes**:
    - `GET /`: Returns a welcome message.
    - `GET /api/clients`: Returns a list of all clients.
    - `POST /api/clients`: Creates a new client.
    - `GET /api/clients/:email`: Returns a specific client by email.
    - `DELETE /api/clients/:email`: Deletes a specific client by email.
    - `PUT /api/clients/:email`: Updates a specific client by email.
    - `POST /api/clients/:email/invest`: Allows a client to invest in a stock.
    - `POST /api/portfolio`: Simulates a portfolio over a number of months.

## `src/Classes/BankAccount.ts`
Defines the `BankAccount` class, which represents a bank account with a balance.

## `src/Classes/Account.ts`
Defines the `Account` class, which represents an investment account linked to a bank account.

## `src/Classes/Person.ts`
Defines the `Person` class, which represents a person with a name, email, bank account, and investment account.

## `src/Classes/Stock.ts`
Defines the `Stock` class, which represents a stock with various attributes like symbol, currency, price, dividend yield, volatility, and expected return.

## `src/Classes/TradingCompany.ts`
Defines the `TradingCompany` class, which manages a list of clients and provides methods to add, get, update, and delete clients.

## `src/Classes/Portfolio.ts`
Defines the `Portfolio` class, which represents a collection of stocks and provides methods to add stocks and simulate their performance over time.

## `src/Enums/StockSymbol.ts`
Defines the `StockSymbol` enum, which lists possible stock symbols.