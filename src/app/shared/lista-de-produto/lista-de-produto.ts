import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, ProdutoVitrine, Product } from '../../service/product.service';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-lista-de-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-de-produto.html',
  styleUrl: './lista-de-produto.css',
})
export class ListaDeProduto implements OnInit {

  vitrine$!: Observable<ProdutoVitrine[]>;
  variacaoSelecionada = new Map<string, number>();

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService
  ) {
    this.vitrine$ = this.productService.vitrine$;
  }

  ngOnInit() {
    this.productService.loadPublicProducts();
  }

  scrollLeft() {
    this.carouselContainer?.nativeElement.scrollBy({ left: -280, behavior: 'smooth' });
  }

  scrollRight() {
    this.carouselContainer?.nativeElement.scrollBy({ left: 280, behavior: 'smooth' });
  }

  adicionar(product: Product) {
    this.cartService.add(product);
  }

  selecionarVariacao(produto: ProdutoVitrine, variacaoId: number) {
    this.variacaoSelecionada.set(produto.name, variacaoId);
  }

  getVariacao(produto: ProdutoVitrine): Product {
    const id = this.variacaoSelecionada.get(produto.name);
    return produto.variacoes.find(v => v.id === id) ?? produto.variacoes[0];
  }
}
