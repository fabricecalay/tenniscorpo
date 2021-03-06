import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import {AuthenticationService} from './authentication.service';

import { Membre } from './membre';
import { MEMBRES } from './mock-members';

@Injectable()
export class MembreService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getMembres(clubId:number): Observable<Membre[]> {
    return this.http.get<Membre[]>(environment.publicApiUrl + "/membres" + (clubId!=null?("?clubId="+clubId):""), this.authenticationService.getPrivateApiHttpOptions());
  }

  getTemplateImportMembres(){
    let options = this.authenticationService.getPrivateApiHttpOptions();
    options["responseType"] = "blob";
    return this.http.get(environment.privateApiUrl + "/membres/import/template",options);
  }

  getListeForce(){
    let options = this.authenticationService.getPrivateApiHttpOptions();
    options["responseType"] = "blob";
    return this.http.get(environment.publicApiUrl + "/membres/listeForce",options);
  }

  getExportMembres(){
    let options = this.authenticationService.getPrivateApiHttpOptions();
    options["responseType"] = "blob";
    return this.http.get(environment.privateApiUrl + "/membres/export",options);
  }

  importData(content){
    return this.http.post<any>(environment.privateApiUrl + "/membres/import",content, this.authenticationService.getPrivateApiHttpOptions());
  }

  ajoutMembre(membre:Membre){
    return this.http.post<Membre>(environment.privateApiUrl + "/membre",membre, this.authenticationService.getPrivateApiHttpOptions());
  }

  updateMembreInfosGenerales(membre:Membre){
      return this.http.put<Membre>(environment.privateApiUrl + "/membre/" + membre.id + "/infosGenerales",membre, this.authenticationService.getPrivateApiHttpOptions());
  }

  updateClubInfos(membre:Membre){
      return this.http.put<Membre>(environment.privateApiUrl + "/membre/" + membre.id + "/clubInfos",membre, this.authenticationService.getPrivateApiHttpOptions());
  }

  updateCoordonnees(membre:Membre){
      return this.http.put<Membre>(environment.privateApiUrl + "/membre/" + membre.id + "/coordonnees",membre, this.authenticationService.getPrivateApiHttpOptions());
  }

  updateContacts(membre:Membre){
      return this.http.put<Membre>(environment.privateApiUrl + "/membre/" + membre.id + "/contacts",membre, this.authenticationService.getPrivateApiHttpOptions());
  }

  updateInfosAft(membre:Membre){
      return this.http.put<Membre>(environment.privateApiUrl + "/membre/" + membre.id + "/infosAft",membre, this.authenticationService.getPrivateApiHttpOptions());
  }

  anonymisation(membre:Membre){
      return this.http.put<Membre>(environment.privateApiUrl + "/membre/" + membre.id + "/anonymisation",membre, this.authenticationService.getPrivateApiHttpOptions());
  }
  
  resetPassword(membre:Membre):Observable<boolean>{
      return this.http.post<boolean>(environment.privateApiUrl +  "/membre/" + membre.id + "/resetPassword",null, this.authenticationService.getPrivateApiHttpOptions());
  }

  deleteMembre(membre: Membre) {
        return this.http.delete<Membre>(environment.privateApiUrl + "/membre?membreId=" + membre.id, this.authenticationService.getPrivateApiHttpOptions());
    }

    isMembreDeletable(membre:Membre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/membre/" + membre.id + "/deletable", this.authenticationService.getPrivateApiHttpOptions());
    }


}
