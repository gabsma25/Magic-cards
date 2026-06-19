// src/app/services/cartas.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Carta {
  id: number;
  nome: string;
  tipo: string;
  conteudo: string;
  custo_mana: string;
  valor_mana: number;
  preco: number;
}

// Para criar/editar nao enviamos o id no corpo (o backend cuida dele).
export type CartaInput = Omit<Carta, 'id'>;

@Injectable({ providedIn: 'root' })
export class CartasService {
  private apiUrl = 'http://localhost:3005/minha-api/cartas';

  constructor(private http: HttpClient) {}

  // READ — todas
  listarCartas(): Observable<Carta[]> {
    return this.http.get<Carta[]>(this.apiUrl);
  }

  // READ — uma
  obterCarta(id: number): Observable<Carta> {
    return this.http.get<Carta>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  criarCarta(carta: CartaInput): Observable<Carta> {
    return this.http.post<Carta>(this.apiUrl, carta);
  }

  // UPDATE
  atualizarCarta(id: number, carta: CartaInput): Observable<Carta> {
    return this.http.put<Carta>(`${this.apiUrl}/${id}`, carta);
  }

  // DELETE
  excluirCarta(id: number): Observable<{ ok: boolean; id: number }> {
    return this.http.delete<{ ok: boolean; id: number }>(`${this.apiUrl}/${id}`);
  }
}
