import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import { transferencia } from '../../../cuentas/dashboard/interfaces/transferencia';
import { leadsMock } from '../../../cuentas/dashboard/mock/transferencias';
import {  MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationsService } from '../../../utils/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transferencia-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
],
  templateUrl: './transferencia-form.component.html',
  styleUrl: './transferencia-form.component.css'
})
export class TransferenciaFormComponent {

cuentas: transferencia[] = leadsMock;

  transferenciaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationsService,
    private router: Router,
  ) {
    this.transferenciaForm = this.fb.group(
      {
        cuentaOrigen: ['', Validators.required],
        cuentaDestino: ['', Validators.required],
        monto: [
          '',
          [
            Validators.required,
            Validators.pattern(/^\d+(\.\d+)?$/),
            Validators.min(0.01)
          ]
        ]
      },
      {
        validators: this.cuentasDiferentesValidator
      }
    );
  }

  cuentasDiferentesValidator(form: AbstractControl): ValidationErrors | null {
    const origen = form.get('cuentaOrigen')?.value;
    const destino = form.get('cuentaDestino')?.value;
    if (origen && destino && origen === destino) {
      return {
        cuentasIguales: true
      };
    }
    return null;
  }

  enviarTransferencia(): void {
    if (this.transferenciaForm.invalid) {
      this.transferenciaForm.markAllAsTouched();
      return;
    }
    const transferencia = this.transferenciaForm.value;
    console.log('Transferencia:', transferencia);
    this.notificationService.success(
      'Transferencia realizada correctamente'
    );
    this.router.navigate(['/home']);

    // Aquí posteriormente llamarías al backend
  }
}
