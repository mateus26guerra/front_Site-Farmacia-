import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cart } from '../cart/cart'; // 👈 IMPORTA O CART
import { CartService } from '../../service/cart.service';
declare const lucide: any;

@Component({
  selector: 'app-navbar-finalizar-pedido',
  standalone: true, // 👈 IMPORTANTE
  imports: [CommonModule, Cart], // 👈 ADICIONA AQUI
  templateUrl: './navbar-finalizar-pedido.html',
  styleUrl: './navbar-finalizar-pedido.css',
})
export class NavbarFinalizarPedido {

  constructor(
    private router: Router,
    public cartService: CartService
  ) {}

  showCart = false;
  activeCategory = '';
  showMenu = false;

  ngOnInit() {
    this.initIcons();
  }

  ngAfterViewChecked() {
    this.initIcons();
  }

  initIcons() {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  setActive(category: string) {
    this.activeCategory = category;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
    setTimeout(() => this.initIcons(), 50);
  }


  abrirCarrinho() {
    this.showCart = true;
  }

  telaInicial() {
    this.router.navigate(['/']);
  }
}
