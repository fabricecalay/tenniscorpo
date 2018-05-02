import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {ClubService} from '../club.service';
import {Club} from '../club';
import {Championnat, TypeChampionnat, CategorieChampionnat, getTypeChampionnat, getCategorieChampionnat, TYPE_CHAMPIONNAT_HIVER, CATEGORIE_CHAMPIONNAT_MESSIEURS, CATEGORIE_CHAMPIONNAT_DAMES, CATEGORIE_CHAMPIONNAT_MIXTES, TYPE_CHAMPIONNAT_ETE, TYPE_CHAMPIONNAT_CRITERIUM} from '../championnat';
import {FormControl} from '@angular/forms';
import {ChampionnatService} from '../championnat.service';
import {Division} from '../division';
import {DivisionService} from '../division.service';
import {compare} from '../utility';
import {EquipeService} from '../equipe.service';

@Component({
    selector: 'app-championnat-equipes',
    templateUrl: './championnat-equipes.component.html',
    styleUrls: ['./championnat-equipes.component.css']
})
export class ChampionnatEquipesComponent implements OnInit {

    championnatCtrl: FormControl = new FormControl();

    championnats: Championnat[];

    selectedChampionnat: Championnat;
    divisions: Division[];

    constructor(
        public dialog: MatDialog,
        private championnatService: ChampionnatService,
        private divisionService: DivisionService,
        private equipeService: EquipeService
    ) {
        this.championnatCtrl = new FormControl();
    }

    ngOnInit() {
        this.refresh(null);
    }

    getTypeChampionnat(championnat: Championnat): TypeChampionnat {
        return getTypeChampionnat(championnat);
    }

    getCategorieChampionnat(championnat: Championnat): CategorieChampionnat {
        return getCategorieChampionnat(championnat);
    }

    getTrophyClass(championnat: Championnat) {
        if (championnat.categorie == CATEGORIE_CHAMPIONNAT_MESSIEURS.code) {
            return "fa fa-trophy menChampionship";
        } else if (championnat.categorie == CATEGORIE_CHAMPIONNAT_DAMES.code) {
            return "fa fa-trophy womenChampionship";
        } else if (championnat.categorie == CATEGORIE_CHAMPIONNAT_MIXTES.code) {
            return "fa fa-trophy mixteChampionship";
        }
        return "";
    }

    getChampionshipHeader(championnat: Championnat) {
        if (championnat.categorie == CATEGORIE_CHAMPIONNAT_MESSIEURS.code) {
            return "menChampionshipHeader";
        } else if (championnat.categorie == CATEGORIE_CHAMPIONNAT_DAMES.code) {
            return "womenChampionshipHeader";
        } else if (championnat.categorie == CATEGORIE_CHAMPIONNAT_MIXTES.code) {
            return "mixteChampionshipHeader";
        }
        return "";
    }

    getTypeClass(championnat: Championnat) {
        if (championnat.type == TYPE_CHAMPIONNAT_HIVER.code) {
            return "fa fa-snowflake-o winterTrophyType";
        } else if (championnat.type == TYPE_CHAMPIONNAT_ETE.code) {
            return "fa fa-sun-o summerTrophyType";
        } else if (championnat.type == TYPE_CHAMPIONNAT_CRITERIUM.code) {
            return "fa fa-star criteriumTrophyType";
        }
        return "";
    }

    getTypeIcon(championnat: Championnat) {
        if (championnat.type == TYPE_CHAMPIONNAT_HIVER.code) {
            return "fa fa-snowflake-o";
        } else if (championnat.type == TYPE_CHAMPIONNAT_ETE.code) {
            return "fa fa-sun-o";
        } else if (championnat.type == TYPE_CHAMPIONNAT_CRITERIUM.code) {
            return "fa fa-star";
        }
        return "";
    }

    loadTeams() {
        console.log("load Teams");
        if (this.selectedChampionnat) {
            this.divisionService.getDivisions(this.selectedChampionnat.id).subscribe(
                divisions => {
                    this.divisions = divisions.sort((a, b) => {return compare(a.numero, b.numero, true)});
                    this.divisions.forEach(division => { 
                        this.equipeService.getEquipes(division.id, null).subscribe(equipes => {console.log(division.numero);console.log(equipes);}); 
                    });
                }
            );
        }
    }

    refresh(championnat: Championnat) {
        this.championnatService.getChampionnats().subscribe(championnats => {
            this.championnats = championnats.sort(
                (a, b) => {
                    let comparaisonAnnee = compare(a.annee, b.annee, false);
                    if (comparaisonAnnee != 0) {
                        return comparaisonAnnee;
                    } else {
                        let comparaisonType = compare(a.type, b.type, true);
                        if (comparaisonType != 0) {
                            return comparaisonType;
                        } else {
                            return compare(a.categorie, b.categorie, true);
                        }
                    }
                });

            if (championnat) {
                this.selectedChampionnat = this.championnats.filter(championnatInList => championnatInList.id == championnat.id)[0];
                this.loadTeams();
            }
        });
    }

    clubs = [
        {nom: "UNAMUR", equipe: 1, selected: false},
        {nom: "BNP FORTIS", equipe: 0, selected: true},
        {nom: "TC WALLONIE", equipe: 2, selected: false},
        {nom: "IATA", equipe: 0, selected: false},
        {nom: "GAZELEC", equipe: 1, selected: false},
        {nom: "RAIL", equipe: 0, selected: false},
        {nom: "POLICE NAMUR", equipe: 0, selected: false},
    ]

    displayTeam(data: any): boolean {
        return data.equipe > 0 || data.selected;
    }

    removeOneTeam(data: any) {
        if (data.equipe > 0) {
            data.equipe--;
        }
    }

    addOneTeam(data: any) {
        data.equipe++;
    }

    selectionClubs() {
        let clubDialogRef = this.dialog.open(SelectionClubDialog, {
            data: {}, panelClass: "selectionClubDialog", disableClose: false
        });

        clubDialogRef.afterClosed().subscribe(result => {
            console.log("selection des clubs termines")
        });
    }

    //TODO : ajouter une poule automatiquement s'il y a au moins une equipe
    //TODO : supprimer la poule si aucune equipe dans une div    ision


//    fichier    : F    ile;
//
//    loadF    ile() {
//        console.log("load file " + this.fi    chier);
    //        }
//
//    onChange(e    vent) {
//        var files: FileList = event.target    .files;
//        this.fichier = files.i    tem(0);
//        var fileReader: FileReader = new FileRe    ader();
//        //atob(this.fi    chier);
//        fileReader.onloadend = functio    n (e) {
//            // you can perform an action with readed da    ta here
//            console.log(fileReader.r    esult);
//                }
//
//        fileReader.readAsBinaryString(this.fi    chier);
//    }


}


@Component({
    selector: 'selection-club-dialog',
    templateUrl: './selectionClubDialog.html',
})
export class SelectionClubDialog {

    private clubs: Club[];

    constructor(
        public dialogRef: MatDialogRef<SelectionClubDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private clubService: ClubService) {

        this.clubService.getClubs().subscribe(clubs => {this.clubs = clubs;});

    }
}
