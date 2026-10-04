import { Component, inject, OnInit } from '@angular/core';
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
import { CuentasTodasService } from '../../services/cuentas_todas.service';
import { CTL } from '../../interfaces/CuentasTodasRespuesta';

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
export class TransferenciaFormComponent implements OnInit {

  // cuentas: transferencia[] = leadsMock;

  cuentas: CTL[] = [];

  transferenciaForm: FormGroup;
  private cuentasTodasService = inject(CuentasTodasService);

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationsService,
    private router: Router,
  ) {
    this.transferenciaForm = this.fb.group({
      cuentaOrigen: ['', Validators.required],
      cuentaDestino: ['', Validators.required],
      monto: [
        '',
        [
          Validators.required,
          Validators.min(0.01)
        ]
      ]
    });

    // Cuando cambia la cuenta origen
    this.transferenciaForm
      .get('cuentaOrigen')
      ?.valueChanges
      .subscribe(numeroCuenta => {
        const cuenta = this.cuentas.find(
          c => c.numeroCuenta === numeroCuenta
        )
        const montoControl = this.transferenciaForm.get('monto');
        if (cuenta) {
          montoControl?.setValidators([
            Validators.required,
            Validators.min(0.01),
            Validators.max(Number(cuenta.saldo))
          ]);
        } else {
          montoControl?.setValidators([
            Validators.required,
            Validators.min(0.01)
          ]);
        }
        montoControl?.updateValueAndValidity();
      });
  }

  ngOnInit(): void {
    this.obtenerTodasCuentas();
  }

  obtenerSaldoCuentaOrigen(): number {
    const numeroCuenta =
      this.transferenciaForm.get('cuentaOrigen')?.value;

    const cuenta = this.cuentas.find(
      c => c.numeroCuenta === numeroCuenta
    );

    return Number(cuenta?.saldo ?? 0);
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

  obtenerTodasCuentas(): void {
    this.cuentasTodasService.obtenerTodasCuentas().subscribe({
      next: (respuesta) => {
        console.log('Respuesta API:', respuesta);
        this.cuentas = respuesta.ctl;
      },
      error: (error) => {
        console.error('Error al obtener cuentas:', error);
      }
    });
  }
}
