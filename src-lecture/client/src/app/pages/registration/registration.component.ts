import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {Person} from '../../types/person.type';
import {ClientsService} from '../../services/clients.service';

@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {

  private formBuilder = inject(FormBuilder);
  private clientsService = inject(ClientsService);

  formGroup = this.formBuilder.group({
    firstName: '',
    lastName: ''
  });

  registerClient() {
    const person: Person = {
      firstName: this.formGroup.get('firstName')!.value || '',
      lastName: this.formGroup.get('lastName')!.value || ''
    };

    this.clientsService.create(person).subscribe(id => {
      console.log(id);
    });
  }
}
