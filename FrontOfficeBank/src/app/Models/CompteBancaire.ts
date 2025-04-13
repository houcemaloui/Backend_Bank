import { User } from "./User";

export interface CompteBancaire {
  idCompte: number;
  typecompte: string;
  solde: number;
  userId: number | null;  // Changement ici
  numCompte:number
  user?:User
  approved?:boolean;
}

