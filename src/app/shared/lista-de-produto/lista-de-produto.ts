import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { Product } from '../../service/product.service';

@Component({
  selector: 'app-lista-de-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-de-produto.html',
  styleUrl: './lista-de-produto.css',
})
export class ListaDeProduto implements OnInit {

  products$!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {
    this.products$ = this.productService.products$;
  }

  ngOnInit() {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      // 🔒 ADMIN
      this.productService.loadPrivateProducts();
    } else {
      // 🔓 PÚBLICO
      this.productService.loadPublicProducts();
    }
  }

  delete(id: number) {
  if (confirm('Tem certeza que deseja deletar este produto?')) {
    this.productService.deleteProduct(id);
  }
}

}
