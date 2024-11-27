import {Component, inject, OnInit} from '@angular/core';
import {ApiClientsService} from '../../services/api-clients.service';
import {Client} from '../../types/client-type';
import {Column} from '../../types/column.type';
import {TableComponent} from '../../components/table/table.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-client-list',
  imports: [
    TableComponent,
    TableComponent,
    FormsModule
  ],
  templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit{

  private clientService = inject(ApiClientsService);

  isLoading: boolean = false;
  isDeleting: boolean = false;

  clients: Client[] = [];
  filteredClients: Client[] = [];
  search: string = '';

  clientsColumns: Column<Client>[] = [
    { label: 'Meno', attribute: 'name' },
    { label: 'Email', attribute: 'email' },
    { label: 'Bankový Zostatok', attribute: 'bankAccountBalance' },
    { label: 'Investičný Zostatok', attribute: 'investmentAccountBalance' },
    { label: 'Akcie', text: 'Odstrániť', onCLick: (client: Client) => this.deleteClient(client)}
  ]

  deleteClient(client: Client) {
    this.isDeleting = true;
    this.clientService.delete(client.email!).subscribe(() => {
      this.isDeleting = false;
      this.refreshData();
    });
  }

  searchClients(): void {
    if (this.search.trim() === '') {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter((client) =>
        client.email.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.isLoading = true;
    this.clientService.getAll().subscribe(clients => {
      console.log('Clients fetched from API:', clients);
      this.clients = clients;
      this.filteredClients = clients;
      this.isLoading = false;
    });
  }
}
