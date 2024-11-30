import {Component, inject} from '@angular/core';
import {PortfolioService} from '../../services/portfolio.service';
import {StockData} from '../../types/stockdata-type';
import { Modal } from 'bootstrap';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StockSymbol} from '../../../../../Enums/StockSymbol';

@Component({
  selector: 'app-portfolio',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent {

  stockSymbols = Object.values(StockSymbol); // konverzia enumu na pole hodnot

  private formBuilder = inject(FormBuilder);
  private portfolioService = inject(PortfolioService);

  portfolioForm: FormGroup = this.formBuilder.group({
    stockSymbol: ['', Validators.required],
    currency: ['EUR', Validators.required],
    stockPrice: [1, [Validators.required]],
    dividendYield: [0, [Validators.min(0), Validators.max(1)]],
    volatility: [0, [Validators.min(0), Validators.max(1)]],
    expectedReturn: [0, [Validators.min(0), Validators.max(1)]],
    totalShares: [1, [Validators.required]],
    months: [6, [Validators.required, Validators.min(1)]],
    showInfo: [true],
  });

  stocks: StockData[] = [];
  simulationResult: string = '';

  addStock(): void {
    if (this.portfolioForm.valid) {

      const stock: StockData = {
        stockSymbol: this.portfolioForm.value.stockSymbol,
        currency: this.portfolioForm.value.currency,
        stockPrice: this.portfolioForm.value.stockPrice,
        dividendYield: this.portfolioForm.value.dividendYield,
        volatility: this.portfolioForm.value.volatility,
        expectedReturn: this.portfolioForm.value.expectedReturn,
        totalShares: this.portfolioForm.value.totalShares
      };

      this.stocks.push(stock);
      console.log("ADD STOCK", this.portfolioForm.value);

      const months = this.portfolioForm.get('months')?.value;
      const showInfo = this.portfolioForm.get('showInfo')?.value;

      this.portfolioForm.reset({
        months: months,
        showInfo: showInfo,
        stockSymbol: '',
        currency: 'EUR',
        stockPrice: '',
        dividendYield: this.portfolioForm.value.dividendYield,
        volatility: this.portfolioForm.value.volatility,
        expectedReturn: this.portfolioForm.value.expectedReturn,
        totalShares: '',
      });
    }
  }

  runSimulation(): void {
    const { months, showInfo } = this.portfolioForm.value;

    console.log("SIMULATION", this.portfolioForm.value);

    this.portfolioService.simulatePortfolio(this.stocks, months, showInfo).subscribe(
      (response) => {
        console.log('Simulation Response:', response);
        this.simulationResult = JSON.stringify(response, null, 2);
        const modal = new Modal(document.getElementById('resultModal') as HTMLElement);
        modal.show();
      }
    );
  }
}
