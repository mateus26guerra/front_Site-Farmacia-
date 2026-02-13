import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  variacao: string; // 👈 ESSENCIAL
  imagemUrl: string;

  categoria?: {
    id: number;
    nome_categoria: string;
  };

  preco: {
    valor: number;
    desconto: number;
    valorFinal: number;
  };
}


export interface ProdutoAddDTO {
  name: string;
  valor: number;
  desconto: number;
  variacao: string;
  imagemUrl: string;
  categoriaId: number;
  quantidadeEmEstoque: number;
}

export interface ProdutoVitrine {
  name: string;
  variacoes: Product[];
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


addProduct(product: ProdutoAddDTO) {
  return this.http.post(
    `${this.API_PRIVADA}/add_products`,product);
}

groupByName(produtos: Product[]): ProdutoVitrine[] {
  const map = new Map<string, Product[]>();

  produtos.forEach(p => {
    if (!map.has(p.name)) {
      map.set(p.name, []);
    }
    map.get(p.name)!.push(p);
  });

  return Array.from(map.entries()).map(([name, variacoes]) => ({
    name,
    variacoes
  }));
}

vitrine$ = this.products$.pipe(
  map(produtos => this.groupByName(produtos))
);

}
