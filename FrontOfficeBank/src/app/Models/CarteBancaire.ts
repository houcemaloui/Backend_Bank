import { CompteBancaire } from "./CompteBancaire";

export interface CarteBancaire {
    idCarte?: number;
    typeCarte: string;
    dateExpiration: string;
    statut: string;
    idCompte: number;
    numCarte:number;
    compte:CompteBancaire
  }
  