import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dado-clientes',
  imports: [CommonModule, Navbar],
  templateUrl: './dado-clientes.html',
  styleUrl: './dado-clientes.css',
})
export class DadoClientes {

  constructor(private router: Router) {}

  irParaLogin() {
    this.router.navigate(['/login']);
  }

  compraRapida() {
    this.router.navigate(['/finalizar-pedido']);
  }
}
