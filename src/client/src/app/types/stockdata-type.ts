import {StockSymbol} from '../../../../Enums/StockSymbol';

export type StockData = {

  stockSymbol: StockSymbol;
  currency: string;
  stockPrice: number;
  dividendYield: number;
  volatility: number;
  expectedReturn: number;
  totalShares: number;

}
