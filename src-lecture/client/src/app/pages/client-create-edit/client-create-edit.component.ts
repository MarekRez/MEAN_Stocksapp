import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Person} from '../../types/person.type';
import {ClientsService} from '../../services/clients.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-create-edit',
  imports: [
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './client-create-edit.component.html'
})
export default class ClientCreateEditComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  client: Person | undefined;
  isEdit: boolean = false;

  isSending: boolean = false;

  formGroup: FormGroup | undefined;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id: number = +params['id'];

      this.isEdit = Number.isInteger(id);

      if (this.isEdit) {
        this.clientsService.getById(id).subscribe(person => {
          this.client = person;
          this.createForm();
        });
      } else {
        this.createForm();
      }
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      firstName: this.client?.firstName || '',
      lastName: this.client?.lastName || ''
    });
  }

  registerClient() {
    const person: Person = {
      ...this.client,
      firstName: this.formGroup?.get('firstName')!.value || '',
      lastName: this.formGroup?.get('lastName')!.value || ''
    };

    this.isSending = true;

    const observable = this.isEdit ? this.clientsService.edit(person) : this.clientsService.create(person);
    observable.subscribe(() => {
      this.router.navigate(['/client-list']).then();
      this.isSending = false;
    });
  }
}
