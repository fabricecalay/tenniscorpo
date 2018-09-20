import {Terrain} from "./terrain";

export class Club {
    id: number;
    numero:string;
    nom: string;
    description: string;
    terrain:Terrain;
    actif: boolean=true;
}
