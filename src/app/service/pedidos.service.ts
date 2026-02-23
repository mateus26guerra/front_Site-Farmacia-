import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ItemPedido {
  produtoId: number;
  nomeProduto: string;
  variacao: string;
  imagemUrl: string;
  categoria: string;
  preco: number; 
  quantidade: number;
}

export interface Pedido {

  id: number;
  criado: string;

  cliente: string;
  telefone: string;

  endereco: string;
  bairro: string;
  complemento: string;

  formaDePagamento: string;

  itens: ItemPedido[];

}

@Injectable({
  providedIn: 'root',
})
export class PedidosService {

  private api = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Pedido[]> {

    return this.http.get<Pedido[]>(this.api);

  }

  
 geraPdf(id: number) {
  return this.http.get(`${this.api}/${id}/pdf`, {
    responseType: 'blob'
  });
}
}