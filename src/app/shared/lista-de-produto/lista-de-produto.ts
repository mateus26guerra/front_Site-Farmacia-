import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../service/cart.service';
import { Product, ProductService, ProdutoVitrine } from '../../service/product.service';

@Component({
  selector: 'app-lista-de-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-de-produto.html',
  styleUrl: './lista-de-produto.css',
})
export class ListaDeProduto implements OnInit {

  @ViewChild('carouselContainer', { static: false })
  carousel!: ElementRef<HTMLDivElement>;

  vitrine$!: Observable<ProdutoVitrine[]>;

  variacoesSelecionadas = new Map<string, number>();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.vitrine$ = this.productService.vitrine$;
    this.productService.loadPublicProducts();
  }

  getVariacao(p: ProdutoVitrine): Product {
    const selectedId = this.variacoesSelecionadas.get(p.name);

    if (selectedId) {
      return p.variacoes.find(v => v.id === selectedId) || p.variacoes[0];
    }

    return p.variacoes[0];
  }

  selecionarVariacao(p: ProdutoVitrine, id: number) {
    this.variacoesSelecionadas.set(p.name, id);
  }

  adicionar(produto: Product) {
    this.cartService.add(produto);
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}