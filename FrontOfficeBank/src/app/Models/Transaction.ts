export class Transaction {
    id!: number;
    sender!: { numCompte: number }; 
    receiver!: { numCompte: number }; 
    amount!: number;
    timestamp!: string; 
  }