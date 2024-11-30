import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiClientsService} from '../../services/api-clients.service';
import {Client} from '../../types/client-type';
import {Router} from '@angular/router';
import {NgClass} from '@angular/common';
import {CarouselComponent} from '../../components/carousel/carousel.component';

@Component({
  selector: 'app-add-client',
  imports: [
    ReactiveFormsModule,
    NgClass,
    CarouselComponent
  ],
  templateUrl: './add-client.component.html',
})
export class AddClientComponent {

  private formBuilder = inject(FormBuilder);
  private clientsService = inject(ApiClientsService);
  private router = inject(Router)

  isSending: boolean = false;

  emailExists = false;


  formGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    bankAccountBalance: [null, [Validators.required, Validators.min(0)]],
    investmentAccountBalance: [null, [Validators.required, Validators.min(0)]]
  });

  validateEmail() {
    const email = this.formGroup.get('email')?.value;
    if (email) {
      this.clientsService.getAll().subscribe((clients) => {
        this.emailExists = clients.some((client) => client.email === email);
        // some vrati true ak aspon jeden klient ma rovnaky email;
        // .some - an array method that tests whether at least one element in the array passes the test implemented by the provided function
      });
    }
  }

  registerClient() {
    if (this.emailExists) {
      alert('The email already exists! Please use a different email.');
      return;
    }

    if (this.formGroup.invalid) {
      return; // nepojde submitnut ak nie su vyplnene vsetky polia
    }

    const client: Client = {
      name: this.formGroup.get('name')!.value || '',
      email: this.formGroup.get('email')!.value || '',
      bankAccountBalance: this.formGroup.get('bankAccountBalance')!.value || 0,
      investmentAccountBalance: this.formGroup.get('investmentAccountBalance')!.value || 0
    };

    this.isSending = true;
    this.clientsService.create(client).subscribe(() => {
      this.router.navigate(['/client-list']).then();
      this.isSending = false;
    });
  }
}
