import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../service/product.service';
import { Observable } from 'rxjs';
import { Navbar } from '../../shared/navbar/navbar';
import { ListaDeProduto } from "../../shared/lista-de-produto/lista-de-produto";
import { SidebarComponent } from "../../shared/sidebar/sidebar.component";
import { NavbarAdministradorComponent } from "../../shared/navbar-administrador/navbar-administrador";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, ListaDeProduto, SidebarComponent, NavbarAdministradorComponent,NavbarAdministradorComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product.css',

})
export class ProductListComponent {

  products$!: Observable<Product[]>;

  
  name = '';
  price!: number;
  imagemUrl = ''

  constructor(private productService: ProductService) {
    this.products$ = this.productService.products$;
  }

  addProduct() {
    this.productService.addProduct({
      name: this.name,
      price: this.price,
      imagemUrl: this.imagemUrl
    });

    this.name = '';
    this.price = 0;
    this.imagemUrl = '';
  }
}
