import {Component, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {TableComponent} from '../../components/table/table.component';
import {Column} from '../../types/column.type';
import {ApiClientsService} from '../../services/api-clients.service';
import {Stock} from '../../types/OwnedStock-type';

@Component({
  selector: 'app-investing',
  imports: [
    NgOptimizedImage,
    ReactiveFormsModule,
    TableComponent,
    FormsModule
  ],
  templateUrl: './investing.component.html',
})
export class InvestingComponent implements OnInit {

  clientsColumns: Column<Stock>[] = [
    { label: 'Email', attribute: 'email' },
    { label: 'Stock Symbol', attribute: 'stockSymbol' },
    { label: 'Shares', attribute: 'shares' },
  ];

  rows: Stock[] = [];
  filteredRows: Stock[] = [];

  private formBuilder = inject(FormBuilder);
  private clientService = inject(ApiClientsService);

  isLoading: boolean = false;
  search: string = '';

  emailForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

 buyForm: FormGroup = this.formBuilder.group({
   stockSymbol: ['', Validators.required],
   currency: ['EUR', Validators.required],
   stockPrice: [1, [Validators.required]],
   dividendYield: [0, [Validators.min(0), Validators.max(1)]],
   volatility: [0, [Validators.min(0), Validators.max(1)]],
   expectedReturn: [0, [Validators.min(0), Validators.max(1)]],
   amount: [1, [Validators.required]]
  });

  sellForm: FormGroup = this.formBuilder.group({
    stockSymbol: ['', Validators.required],
    sharesToSell: [0, Validators.required],
  });

  buyStock(): void {
    if (this.buyForm.valid && this.emailForm.valid) {
      const email = this.emailForm.get('email')!.value;
      const buyData = this.buyForm.value;
      this.buyForm.reset({
        stockSymbol: '',
        currency: 'EUR',
        stockPrice: '',
        dividendYield: this.buyForm.value.dividendYield,
        volatility: this.buyForm.value.volatility,
        expectedReturn: this.buyForm.value.expectedReturn,
        totalShares: '',
      }
      );
      this.clientService.buyStock(email, buyData).subscribe({
        next: () => {
          this.fetchClientStocks(); // refresh tabulky po kúpe
          console.log('Stock bought successfully');
        },
        error: (err) => console.error('Error buying stock', err),
      });
    }
  }

  sellStock(): void {
    if (this.sellForm.valid && this.emailForm.valid) {
      const email = this.emailForm.get('email')!.value;
      const sellData = this.sellForm.value;
      this.sellForm.reset();
      this.clientService.sellStock(email, sellData).subscribe({
        next: () => {
          this.fetchClientStocks(); // refresh tabulky po predaji
          console.log('Stock sold successfully');
        },
        error: (err) => console.error('Error selling stock', err),
      });
    }
  }

  ngOnInit(): void {
    this.fetchClientStocks();
  }

  fetchClientStocks(): void {
    this.isLoading = true;
    this.clientService.getClientStocks().subscribe({
      next: (data: Stock[]) => {
        this.rows = data;
        this.filteredRows = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching client stocks', error);
        this.isLoading = false;
      },
    });
  }

  searchStocks(): void {
    const searchTerm = this.search.trim().toLowerCase();

    if (searchTerm === '') {
      this.filteredRows = this.rows;
    } else {
      this.filteredRows = this.rows.filter((row) =>
        row.email.toLowerCase().includes(searchTerm)
        )
    }
  }

}
