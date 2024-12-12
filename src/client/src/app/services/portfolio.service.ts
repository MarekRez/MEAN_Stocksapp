import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockData} from '../types/stockdata-type';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api'; // or 'http://localhost:3000/api/clients' for local server

  simulatePortfolio(stocks: StockData[], months: number, showInfo: boolean): Observable<any> {
    const body = { stocks, months, showInfo };
    return this.http.post<any>(`${this.apiUrl}/portfolio`, body);
  }
}
