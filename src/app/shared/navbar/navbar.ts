import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';
import { Cart } from '../cart/cart';
import { CartService } from '../../service/cart.service';

declare const lucide: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, Cart],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit, AfterViewChecked {

  showLogoutModal = false;
  closing = false;
  showMenu = false;
  activeCategory = '';

 constructor(
  public authService: AuthService,
  private productService: ProductService,
  public cartService: CartService
) {}


  onSearch(value: string) {
    this.productService.setSearch(value);
  }

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

  abrirLogout() {
    this.showLogoutModal = true;
  }

  cancelarLogout() {
    this.closing = true;
    setTimeout(() => {
      this.showLogoutModal = false;
      this.closing = false;
    }, 250);
  }

  confirmarLogout() {
    this.closing = true;
    setTimeout(() => {
      this.authService.logout();
      location.href = '/';
    }, 250);
  }
  showCart = false;

abrirCarrinho() {
  this.showCart = true;
}

}
