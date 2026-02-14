import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../shared/navbar/navbar';
import { CartService } from '../../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cesta-de-compras',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './cesta-de-compras.html',
  styleUrl: './cesta-de-compras.css',
})
export class CestaDeCompras {

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  remover(id: number) {
    this.cartService.remove(id);
  }

  aumentar(id: number) {
    this.cartService.aumentar(id);
  }

  diminuir(id: number) {
    this.cartService.diminuir(id);
  }

  irParaHome() {
    this.router.navigate(['/']);
  }
   irParaTelaDados() {
    this.router.navigate(['/dados']);
  }
}
