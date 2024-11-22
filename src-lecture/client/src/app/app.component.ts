import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {

  clients = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Tomas', lastName: 'Sromovsky' }
  ];
}
