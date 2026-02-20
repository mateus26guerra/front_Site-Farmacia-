import { Component } from '@angular/core';
import { Navbar } from "../../../shared/navbar/navbar";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { NavbarFinalizarPedido } from "../../../shared/navbar-finalizar-pedido/navbar-finalizar-pedido";

@Component({
  selector: 'app-dado-clientes',
  imports: [CommonModule, NavbarFinalizarPedido],
  templateUrl: './dado-clientes.html',
  styleUrl: './dado-clientes.css',
})
export class DadoClientes {

  modoPedido: string = '';      // '' | 'rapido'
  tipoEntrega: string = '';     // '' | 'endereco' | 'farmacia'
  currentStep = 1;


  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  // Botão só ativa quando: selecionou pedido rápido E selecionou tipo de entrega
  podeContinuar(): boolean {
    return this.modoPedido === 'rapido' && this.tipoEntrega !== '';
  }

  remover(id: number) {
    this.cartService.remove(id);
  }

  irParaTelaDados() {
    if (this.podeContinuar()) {
      this.router.navigate(['/finalizar-pedido']);
    }
  }

  voltar() {
    this.router.navigate(['/cestar']);
  }

  alterarTelefone() {
    this.router.navigate(['/dados']);
  }
}