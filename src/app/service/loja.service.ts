import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Loja {
  id?: number;
  nome: string;
  cep: string;
  cnpj: string;
  telefone: string;
  tipoAtendimento: string;
  imagemUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class LojaService {

  private apiUrl = 'http://localhost:8080/lojas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Loja[]> {
    return this.http.get<Loja[]>(`${this.apiUrl}`);
  }

criar(loja: Loja) {
  return this.http.post(this.apiUrl, loja);
}

 atualizar(id: number, loja: Loja) {
  return this.http.put(`${this.apiUrl}/${id}`, loja);
}

  deletar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarPorId(id: number) {
  return this.http.get<Loja>(`${this.apiUrl}/${id}`);
}
}