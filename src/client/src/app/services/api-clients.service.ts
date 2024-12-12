import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../types/client-type';
import {Stock} from '../types/OwnedStock-type';
import {StockTransactionResult} from '../types/stockTransactionResult-type';
import {TransactionResult} from '../types/transactionResult-type';
import {InvestmentRecord} from '../types/investmentRecord-type';
import {StockData} from '../types/stockdata-type';

@Injectable({
  providedIn: 'root'
})
export class ApiClientsService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api'; // or 'http://localhost:3000/api/clients' for local server

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  delete(email: string): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/clients/${email}`);
  }

  update(email: string, client: Partial<Client>) : Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${email}`, client);
  }

  getClientStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.apiUrl}/client/stocks`);
  }

  buyStock(email: string, stockData: StockData): Observable<StockTransactionResult> {
    return this.http.post<StockTransactionResult>(`${this.apiUrl}/clients/${email}/invest`, stockData);
  }

  sellStock(email: string, stockData: StockData): Observable<StockTransactionResult> {
    return this.http.post<StockTransactionResult>(`${this.apiUrl}/clients/${email}/sell`, stockData);
  }
  depositToBank(iban: string, amount: number): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(`${this.apiUrl}/clients/${iban}/bank/deposit`, {amount} );
  }

  withdrawFromBank(iban: string, amount: number): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(`${this.apiUrl}/clients/${iban}/bank/withdraw`, {amount});
  }

  depositToInvestment(iban: string, amount: number): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(`${this.apiUrl}/clients/${iban}/investment/deposit`, {amount});
  }

  withdrawFromInvestment(iban: string, amount: number): Observable<TransactionResult> {
    return this.http.post<TransactionResult>(`${this.apiUrl}/clients/${iban}/investment/withdraw`, {amount});
  }

  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/clients/exists/${email}`);
  }
  getInvestmentHistory(email: string): Observable<{ history: InvestmentRecord[] }> {
    return this.http.get<{ history: InvestmentRecord[] }>(`${this.apiUrl}/clients/${email}/investment/history`);
  }

}
