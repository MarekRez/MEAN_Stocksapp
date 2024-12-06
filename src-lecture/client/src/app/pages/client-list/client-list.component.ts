import {Component, computed, effect, inject, OnInit, Signal, signal, WritableSignal} from '@angular/core';
import {Person} from '../../types/person.type';
import {ClientsService} from '../../services/clients.service';
import {TableComponent} from '../../components/table/table.component';
import {Column} from '../../types/column.type';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, map, startWith} from 'rxjs';
import {FORM_DEBOUNCE_TIME} from '../../configurations/form.config';
import latinize from 'latinize';

@Component({
  selector: 'app-client-list',
  imports: [
    TableComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './client-list.component.html'
})
export default class ClientListComponent implements OnInit {

  private clientService = inject(ClientsService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  formGroup = this.formBuilder.group({
    search: ''
  });

  isLoading: boolean = false;
  isDeleting: boolean = false;

  clients: Person[] = [];
  filteredClients: Person[] = [];

  // clientsSignal: Signal<Person[]> = toSignal(this.clientService.getAll(), {initialValue: []});

  clientsColumns: Column<Person>[] = [
    { label: 'First', width: '30%', attribute: 'firstName' },
    { label: 'Last', attribute: 'lastName' },
    { label: '', width: '100px', text: 'Odstrániť', onCLick: (client: Person) => this.deleteClient(client)},
    { label: '', width: '80px', text: 'Upraviť', onCLick: (client: Person) => this.editClient(client)}
  ]

  // constructor() {
  //   effect(() => {
  //     console.log('Clients changed');
  //
  //
  //     console.log(this.clientsSignal());
  //   });
  // }

  deleteClient(client: Person) {
    this.isDeleting = true;
    this.clientService.delete(client.id!).subscribe(() => {
      this.isDeleting = false;
      this.refreshData();
    });
  }

  editClient(client: Person) {
    this.router.navigate(['edit-client', client.id]).then();
  }

  ngOnInit() {
    this.formGroup.get('search')!.valueChanges.pipe(
      debounceTime(FORM_DEBOUNCE_TIME),
      map(query => {
        query = query ? latinize(query).toUpperCase() : '';
        return query;
      })
    ).subscribe(query => {
      this.filteredClients = this.clients.filter(client => {
        const firstName = latinize(client.firstName).toUpperCase();
        const lastName = latinize(client.lastName).toUpperCase();
        return firstName.includes(query) || lastName.includes(query);
      });
    });

    this.refreshData();
  }

  refreshData() {
    this.isLoading = true;
    this.clientService.getAll().subscribe(clients => {
      this.clients = clients;
      this.filteredClients = this.clients;
      this.isLoading = false;
    });
  }
}
