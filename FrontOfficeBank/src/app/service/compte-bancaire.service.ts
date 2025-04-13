import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompteBancaire } from '../Models/CompteBancaire';
import { Transaction } from '../Models/transaction';

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {
  private apiUrl = 'http://localhost:8089/api/auth/comptes';

  constructor(private http: HttpClient) {}

  getAllComptes(): Observable<CompteBancaire[]> {
    return this.http.get<CompteBancaire[]>(`${this.apiUrl}/getall`);
  }

  getCompteById(id: number): Observable<CompteBancaire> {
    return this.http.get<CompteBancaire>(`${this.apiUrl}/findById/${id}`);
  }

  addCompte(compte: { typecompte: string; solde: number; userId: number | null }): Observable<CompteBancaire> {
    const url = `${this.apiUrl}/ajouter?userId=${compte.userId}&typecompte=${compte.typecompte}&solde=${compte.solde}`;
    return this.http.post<CompteBancaire>(url, {});
  }
  

  updateCompte(compte: CompteBancaire): Observable<CompteBancaire> {
    return this.http.put<CompteBancaire>(`${this.apiUrl}/update/${compte.idCompte}`, compte);
  }
  
  supprimerCompte(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
  

  approuverCompte(idCompte: number): Observable<CompteBancaire> {
    const url = `${this.apiUrl}/approuver/${idCompte}`; 
    return this.http.put<CompteBancaire>(url, {}); 
  }


  getNonApprovedBankAccounts(): Observable<CompteBancaire[]> {
    return this.http.get<CompteBancaire[]>(`${this.apiUrl}?approved=false`);
  }

  getComptesByUserId(userId: number): Observable<CompteBancaire[]> {
    return this.http.get<CompteBancaire[]>(`${this.apiUrl}/getByUserId/${userId}`);
  }

  transferMoney(senderId: number, receiverId: number, amount: number): Observable<string> {
    const url = `${this.apiUrl}/transfer?senderId=${senderId}&receiverId=${receiverId}&amount=${amount}`;
    return this.http.post<string>(url, {});
  }

  getTransactionsBySender(numCompte: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/sender/${numCompte}`);
  }

  getTransactionsByReceiver(numCompte: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/receiver/${numCompte}`);
  }
}
