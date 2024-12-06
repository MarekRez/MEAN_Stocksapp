import {Component, inject, OnInit} from '@angular/core';
import {ApiClientsService} from '../../services/api-clients.service';
import {Client} from '../../types/client-type';
import {Column} from '../../types/column.type';
import {TableComponent} from '../../components/table/table.component';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Modal } from 'bootstrap';
import {CarouselComponent} from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-client-list',
  imports: [
    TableComponent,
    TableComponent,
    FormsModule,
    ReactiveFormsModule,
    CarouselComponent
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',

  standalone: true
})
export class ClientListComponent implements OnInit{

  carouselImages = [
    {
      src: '/images/Client.jpeg',
      alt: 'Dynamic Stock Analysis',
      title: 'Dynamic Stock Analysis',
      caption: 'Analyze stocks with advanced tools and dynamic updates.',
      width: '1600',
      height: '900',
    },
    {
      src: '/images/Invest.jpg',
      alt: 'Efficient Portfolio Management',
      title: 'Efficient Portfolio Management',
      caption: "Streamline portfolio handling for better decision-making.",
      width: '1400',
      height: '934',
    },
    {
      src: '/images/Bank_account.jpeg',
      alt: 'Simulate Growth Scenarios',
      title: 'Simulate Growth Scenarios',
      caption: 'Predict portfolio growth under various market conditions.',
      width: '3200',
      height: '1800',
    },
  ];

  private formBuilder = inject(FormBuilder); // kvoli modalu
  private clientService = inject(ApiClientsService);

  isLoading: boolean = false;
  isDeleting: boolean = false;

  clients: Client[] = [];
  filteredClients: Client[] = [];
  search: string = '';

  clientsColumns: Column<Client>[] = [
    { label: 'Meno', attribute: 'name' },
    { label: 'Email', attribute: 'email' },
    { label: 'IBAN', attribute: 'iban' },
    { label: 'Bankový Zostatok', attribute: 'bankAccountBalance' },
    { label: 'Investičný Zostatok', attribute: 'investmentAccountBalance' },
    { label: 'Akcie:', text: 'Upraviť', onCLick: (client: Client) => this.editClient(client)},
    { label: '', text: 'Odstrániť', onCLick: (client: Client) => this.deleteClient(client)},
  ]

  updateForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    bankAccountBalance: [0, Validators.required],
    investmentAccountBalance: [0, Validators.required],
  });

  updateClient(): void {
    if (this.updateForm.valid) {
      const updatedClient: Partial<Client> = {
        name: this.updateForm.value.name ?? undefined, // undefined kvoli odoslaniu Partial<Client>
        email: this.updateForm.value.email ?? undefined,
        bankAccountBalance: this.updateForm.value.bankAccountBalance ?? undefined,
        investmentAccountBalance: this.updateForm.value.investmentAccountBalance ?? undefined,
      };

      this.clientService.update(updatedClient.email!, updatedClient).subscribe(() => {
        this.refreshData();

        // zatvorenie modalu
        const modal = Modal.getInstance(document.getElementById('updateClientModal') as HTMLElement);
        modal?.hide();
      });
    }
  }

  editClient(client: Client) {
    console.log('Edit client called');
    this.updateForm.patchValue({
      name: client.name,
      email: client.email, // readonly lebo je to unikatne ID
      bankAccountBalance: client.bankAccountBalance,
      investmentAccountBalance: client.investmentAccountBalance,
    });

    // otvori modal
    const modal = new Modal(document.getElementById('updateClientModal') as HTMLElement);
    modal?.show();
  }

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
