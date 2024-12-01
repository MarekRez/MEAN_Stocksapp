import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ApiClientsService} from '../../services/api-clients.service';

@Component({
  selector: 'app-accounts',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './accounts.component.html',
})
export class AccountsComponent {

  private formBuilder = inject(FormBuilder);
  private clientsService = inject(ApiClientsService);

  isLoading = false;

  ibanForm = this.formBuilder.group({
    iban: ['', Validators.required]
  });

  bankAccountForm = this.formBuilder.group({
    amount: [0, [Validators.required, Validators.min(1)]]
  });

  investmentAccountForm = this.formBuilder.group({
    amount: [0, [Validators.required, Validators.min(1)]]
  });

  depositToBank(): void {
    if (this.ibanForm.valid && this.bankAccountForm.valid) {
      const iban = this.ibanForm.get('iban')!.value as string;
      const amount = this.bankAccountForm.get('amount')!.value as number;

      this.isLoading = true;
      this.bankAccountForm.reset();
      this.clientsService.depositToBank(iban, amount).subscribe({
        next: (response) => {
          console.log(`Bank deposit successful: ${response}`);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Bank deposit failed: ${error}`);
          this.isLoading = false;
        },
      });
    }
  }

  withdrawFromBank(): void {
    if (this.ibanForm.valid && this.bankAccountForm.valid) {
      const iban = this.ibanForm.get('iban')!.value as string;
      const amount = this.bankAccountForm.get('amount')!.value as number;

      this.isLoading = true;
      this.bankAccountForm.reset();
      this.clientsService.withdrawFromBank(iban, amount).subscribe({
        next: (response) => {
          console.log(`Bank withdrawal successful: ${response}`);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Bank withdrawal failed: ${error}`);
          this.isLoading = false;
        },
      });
    }
  }

  depositToInvestment(): void {
    if (this.ibanForm.valid && this.investmentAccountForm.valid) {
      const iban = this.ibanForm.get('iban')!.value as string;
      const amount = this.investmentAccountForm.get('amount')!.value as number;

      this.isLoading = true;
      this.investmentAccountForm.reset();
      this.clientsService.depositToInvestment(iban, amount).subscribe({
        next: (response) => {
          console.log(`Investment deposit successful: ${response}`);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Investment deposit failed: ${error}`);
          this.isLoading = false;
        },
      });
    }
  }

  withdrawFromInvestment(): void {
    if (this.ibanForm.valid && this.investmentAccountForm.valid) {
      const iban = this.ibanForm.get('iban')!.value as string;
      const amount = this.investmentAccountForm.get('amount')!.value as number;

      this.isLoading = true;
      this.investmentAccountForm.reset();
      this.clientsService.withdrawFromInvestment(iban, amount).subscribe({
        next: (response) => {
          console.log(`Investment withdrawal successful: ${response}`);
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Investment withdrawal failed: ${error}`);
          this.isLoading = false;
        },
      });
    }
  }
}
