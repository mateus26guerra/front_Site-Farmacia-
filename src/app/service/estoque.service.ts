import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EstoqueRequest {
  produtoId: number;
  lojaId: number;
  quantidade: number;
  precoVenda: number;
}

export interface Estoque {

  id: number;

  loja: {
    id: number;
    nome: string;
  };

  produto: {
    id: number;
    name: string;
    variacao: string;
    imagemBase64: string;
  };

  quantidade: number;

  valorFinal: number;

}

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private api = 'http://localhost:8080/estoque';

  private apiADD = 'http://localhost:8080/productsPublico/lista';


  constructor(private http: HttpClient) {}

  salvar(data: EstoqueRequest): Observable<any> {
    return this.http.post(this.api, data);
  }
listar(): Observable<Estoque[]> {
  return this.http.get<Estoque[]>(this.apiADD);
}

  filtrar(lojaId?: number, nomeLoja?: string, semEstoque?: boolean) {

  let params: any = {};

  if (lojaId !== undefined) {
    params.lojaId = lojaId;
  }

  if (nomeLoja) {
    params.nomeLoja = nomeLoja;
  }

  if (semEstoque !== undefined) {
    params.semEstoque = semEstoque;
  }

  return this.http.get<Estoque[]>(this.api + "/filtro", { params });

}

}