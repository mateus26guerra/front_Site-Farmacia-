import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Produto {
  id: number;
  name: string;
  variacao: string;
  imagemBase64: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private api = 'http://localhost:8080/products';

  constructor(private http: HttpClient) {}

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.api);
  }

}