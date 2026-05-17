import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Estoque } from './estoque.service';


export interface CartItem {
  produtoId: number;
  lojaId: number;
  nomeLoja: string;

  nomeProduto: string;
  imagemBase64?: string;
  variacao?: string;

  precoVenda: number;
  valorFinal: number;

  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  private cartSubject =
    new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();

  add(produto: Estoque) {

    const existente = this.items.find(
      i =>
        i.produtoId === produto.produtoId &&
        i.lojaId === produto.lojaId
    );

    if (existente) {

      existente.quantidade++;

    } else {

      this.items.push({
        produtoId: produto.produtoId,
        lojaId: produto.lojaId,
        nomeLoja: produto.nomeLoja,

        nomeProduto: produto.nomeProduto,
        imagemBase64: produto.imagemBase64,
        variacao: produto.variacao,

        precoVenda: produto.precoVenda,
        valorFinal: produto.valorFinal,

        quantidade: 1
      });

    }

    this.cartSubject.next([...this.items]);
  }

  remove(produtoId: number, lojaId: number) {

    this.items = this.items.filter(
      i =>
        !(
          i.produtoId === produtoId &&
          i.lojaId === lojaId
        )
    );

    this.cartSubject.next([...this.items]);
  }

  aumentar(produtoId: number, lojaId: number) {

    const item = this.items.find(
      i =>
        i.produtoId === produtoId &&
        i.lojaId === lojaId
    );

    if (item) {
      item.quantidade++;
    }

    this.cartSubject.next([...this.items]);
  }

  diminuir(produtoId: number, lojaId: number) {

    const item = this.items.find(
      i =>
        i.produtoId === produtoId &&
        i.lojaId === lojaId
    );

    if (!item) return;

    item.quantidade--;

    if (item.quantidade <= 0) {

      this.remove(produtoId, lojaId);
      return;

    }

    this.cartSubject.next([...this.items]);
  }

  totalItens(): number {

    return this.items.reduce(
      (acc, item) =>
        acc + item.quantidade,
      0
    );

  }

  totalValor(): number {

    return this.items.reduce(
      (acc, item) =>
        acc + (
          item.valorFinal *
          item.quantidade
        ),
      0
    );

  }
}