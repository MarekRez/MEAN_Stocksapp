export type StockTransactionResult = {
  message: string;
  balance: number;
  leftover?: number;
  stock: {
    symbol: string;
    shares: number;
    stockPrice: number;
  };
}
