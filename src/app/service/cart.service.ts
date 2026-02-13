import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantidade: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  get items(): CartItem[] {
    return this.cartSubject.value;
  }

  add(product: Product) {
    const items = [...this.items];
    const existing = items.find(i => i.product.id === product.id);

    if (existing) {
      existing.quantidade++;
    } else {
      items.push({ product, quantidade: 1 });
    }

    this.cartSubject.next(items);
  }

  remove(productId: number) {
    this.cartSubject.next(
      this.items.filter(i => i.product.id !== productId)
    );
  }

  clear() {
    this.cartSubject.next([]);
  }

  totalItens(): number {
    return this.items.reduce((t, i) => t + i.quantidade, 0);
  }

  totalValor(): number {
    return this.items.reduce(
      (t, i) => t + (i.product.preco.valorFinal * i.quantidade),
      0
    );
  }

  aumentar(productId: number) {
  const items = [...this.items];
  const item = items.find(i => i.product.id === productId);

  if (item) {
    item.quantidade++;
    this.cartSubject.next(items);
  }
}

diminuir(productId: number) {
  const items = [...this.items];
  const item = items.find(i => i.product.id === productId);

  if (item && item.quantidade > 1) {
    item.quantidade--;
    this.cartSubject.next(items);
  }
}

}
