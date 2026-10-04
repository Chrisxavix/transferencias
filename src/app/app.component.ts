import { Component } from '@angular/core';
import { CuentasComponent } from './cuentas/dashboard/pages/cuentas/cuentas.component';
import { MenuComponent } from './home/pages/menu/menu.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [CuentasComponent, MenuComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
