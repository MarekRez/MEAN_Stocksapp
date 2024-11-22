import {Component, inject, OnInit} from '@angular/core';
import {Person} from '../../types/person.type';
import {ClientsService} from '../../services/clients.service';
import {TableComponent} from '../../components/table/table.component';
import {Column} from '../../types/column.type';

@Component({
  selector: 'app-client-list',
  imports: [
    TableComponent
  ],
  templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit {

  private clientService = inject(ClientsService);

  isLoading: boolean = false;
  clients: Person[] = [];

  clientsColumns: Column<Person>[] = [
    { label: 'First', attribute: 'firstName' },
    { label: 'Last', attribute: 'lastName' }
  ]

  ngOnInit() {
    this.isLoading = true;
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
      this.isLoading = false;
    });
  }
}
