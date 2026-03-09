import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstoqueRequest {
  produtoId: number;
  lojaId: number;
  quantidade: number;
  precoVenda: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private api = 'http://localhost:8080/estoque';

  constructor(private http: HttpClient) {}

  salvar(data: EstoqueRequest): Observable<any> {
    return this.http.post(this.api, data);
  }

}