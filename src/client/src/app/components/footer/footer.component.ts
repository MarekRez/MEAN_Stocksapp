import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  brand = '© 2024 StocksByMarek. All rights reserved.';
  contactEmail = 'support@stocksbymarek.com';
}
