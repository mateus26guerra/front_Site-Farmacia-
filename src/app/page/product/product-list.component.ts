import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2';

import { ProductService } from '../../service/product.service';
import { ListaDeProduto } from '../../shared/lista-de-produto/lista-de-produto';
import { SidebarComponent } from '../../shared/sidebar/sidebar.component';
import { NavbarAdministradorComponent } from '../../shared/navbar-administrador/navbar-administrador';

import {
  LucideAngularModule,
  Package,
  Plus,
  FolderPlus,
  BarChart3,
  Trash2
} from 'lucide-angular';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LucideAngularModule,
    ListaDeProduto,
    SidebarComponent,
    NavbarAdministradorComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product.css',
})
export class ProductListComponent {

  // 🔹 FORM PRODUTO
  name = '';
  valor!: number;
  desconto = 0;
  imagemUrl = '';
  categoriaId!: number;
  temEmEstoque = true;

  // 🔹 CONTROLE MODAIS
  showProductModal = false;
  showCategoryModal = false;

  constructor(private productService: ProductService) {}

  // 🔥 MODAL PRODUTO
  openProductModal() {
    this.showProductModal = true;
  }

  closeProductModal() {
    this.showProductModal = false;
  }

  // 🔥 MODAL CATEGORIA
  openCategoryModal() {
    this.showCategoryModal = true;
  }

  closeCategoryModal() {
    this.showCategoryModal = false;
  }



  // 🔍 PESQUISA
  onSearch(value: string) {
    this.productService.setSearch(value);
  }
}
