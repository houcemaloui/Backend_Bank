import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteBancaire } from '../Models/CarteBancaire';

@Injectable({
  providedIn: 'root'
})
export class CarteBancaireService {
  private apiUrl = 'http://localhost:8089/api/auth/cartes';

  constructor(private http: HttpClient) {}

  getAllCartes(): Observable<CarteBancaire[]> {
    return this.http.get<CarteBancaire[]>(`${this.apiUrl}/getall`);
}


  addCarte(carte: CarteBancaire): Observable<CarteBancaire> {
    return this.http.post<CarteBancaire>(`${this.apiUrl}/add/${carte.idCompte}`, carte);
  }

  deleteCarte(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
