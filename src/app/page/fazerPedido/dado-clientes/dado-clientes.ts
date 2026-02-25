import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { CommonModule } from '@angular/common';
import { NavbarFinalizarPedido } from "../../../shared/navbar-finalizar-pedido/navbar-finalizar-pedido";

@Component({
  selector: 'app-dado-clientes',
  imports: [CommonModule, NavbarFinalizarPedido],
  templateUrl: './dado-clientes.html',
  styleUrl: './dado-clientes.css',
})
export class DadoClientes {

  modoPedido: string = ''; 
  tipoEntrega: 'ENTREGA' | 'RETIRADA' | '' = '';

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  podeContinuar(): boolean {
    return this.modoPedido === 'rapido' && this.tipoEntrega !== '';
  }

  irParaTelaDados() {
    if (this.podeContinuar()) {
      this.router.navigate(['/finalizar-pedido'], {
        state: {
          tipoEntrega: this.tipoEntrega
        }
      });
    }
  }

  voltar() {
    this.router.navigate(['/cestar']);
  }

  alterarTelefone() {
    this.router.navigate(['/dados']);
  }
}