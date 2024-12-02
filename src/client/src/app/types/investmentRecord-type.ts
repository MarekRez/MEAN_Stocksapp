export type InvestmentRecord = {
  stock: string;
  shares: number;
  price: number;
  type: "buy" | "sell";
}
