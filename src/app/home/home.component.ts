import { Component, OnInit} from '@angular/core';
import {MembreService} from '../membre.service';
import { saveAs } from 'file-saver/FileSaver';
import {Rencontre} from '../rencontre';
import {RencontreService} from '../rencontre.service';
import {addLeadingZero} from '../utility';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    lastResults:Rencontre[]=[];
    nextMeetings:Rencontre[]=[];
    preparationListeForce:boolean=false;
    chargementDerniersResultats:boolean=true;
    chargementProchainesRencontres:boolean=true;

  constructor(
    private rencontreService:RencontreService,
    private membreService: MembreService) { }
  
    ngOnInit(): void {
        this.rencontreService.getLastResults(5).subscribe(lastResults => {
            this.chargementDerniersResultats = false;
            this.lastResults = lastResults;
        });
        this.rencontreService.getNextMeetings(5).subscribe(nextMeetings => {
            this.chargementProchainesRencontres = false;
            this.nextMeetings = nextMeetings;
        });
    }
    
    formatDate(date:Date):string{
        if (date){
            let dateToFormat=new Date(date);
            return addLeadingZero(dateToFormat.getDate()) + "/" + addLeadingZero(dateToFormat.getMonth()+1) + "/" + dateToFormat.getFullYear() + " " + addLeadingZero(dateToFormat.getHours()) + ":" + addLeadingZero(dateToFormat.getMinutes());
        }else{
            return "";
        }
    }
    
  getListeForces(){
      this.preparationListeForce = true;
      this.membreService.getListeForce().subscribe(result => {
          this.preparationListeForce = false;
          saveAs(result, "listeForces.pdf");
      //var fileURL = URL.createObjectURL(result);window.open(fileURL);
    },error => {console.log(error);});
  }

}
