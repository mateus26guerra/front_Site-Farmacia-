import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
  imagemUrl: string;
}
export interface CreateProductDTO {
  name: string;
  valor: number;
  desconto: number;
  imagemUrl: string;
  categoriaId: number;
  temEmEstoque: boolean;
}


@Injectable({ providedIn: 'root' })
export class ProductService {

  private API_PRIVADA = 'http://localhost:8080/products';
  private API_PUBLICA = 'http://localhost:8080/productsPublico';

  private productsSubject = new BehaviorSubject<Product[]>([]);
  private searchSubject = new BehaviorSubject<string>('');

  // 🔥 PRODUTOS JÁ FILTRADOS
  products$ = combineLatest([
    this.productsSubject,
    this.searchSubject
  ]).pipe(
    map(([products, search]) =>
      products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    )
  );

  constructor(private http: HttpClient) {}

  loadPublicProducts() {
    this.http
      .get<Product[]>(`${this.API_PUBLICA}/list`)
      .subscribe(products => this.productsSubject.next(products));
  }

  loadPrivateProducts() {
    this.http
      .get<Product[]>(`${this.API_PRIVADA}/list`)
      .subscribe(products => this.productsSubject.next(products));
  }

  setSearch(term: string) {
    this.searchSubject.next(term);
  }

  deleteProduct(id: number) {
    this.http.delete(`${this.API_PRIVADA}/${id}`)
      .subscribe(() => this.loadPrivateProducts());
  }


addProduct(product: CreateProductDTO) {
  return this.http.post(
    `${this.API_PRIVADA}/add_products`,product);
}


}
