import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';
import {Rencontre, AutorisationRencontre} from './rencontre';
import {formatDate} from './utility';

@Injectable()
export class RencontreService {

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    getRencontres(divisionId: number,pouleId:number,equipeId:number): Observable<Rencontre[]> {
        return this.http.get<Rencontre[]>(environment.publicApiUrl + "/rencontres?divisionId=" + divisionId+(pouleId!=null?("&pouleId="+pouleId):"")+(equipeId!=null?("&equipeId="+equipeId):""));
    }

    getRencontresByDate(date:Date): Observable<Rencontre[]> {
        return this.http.get<Rencontre[]>(environment.publicApiUrl + "/rencontres/byDate?date=" + formatDate(date));
    }

    getRencontresCriteriumByAnnee(annee:string): Observable<Rencontre[]> {
        return this.http.get<Rencontre[]>(environment.publicApiUrl + "/rencontres/criterium?annee=" + annee);
    }

    getLastResults(maxNumberOfResults:number): Observable<Rencontre[]> {
        return this.http.get<Rencontre[]>(environment.publicApiUrl + "/rencontres/last?numberOfResults=" + maxNumberOfResults);
    }

    getNextMeetings(maxNumberOfResults:number): Observable<Rencontre[]> {
        return this.http.get<Rencontre[]>(environment.publicApiUrl + "/rencontres/next?numberOfResults=" + maxNumberOfResults);
    }

    isResultatsRencontreModifiables(rencontre:Rencontre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/isResultatsModifiables", this.authenticationService.getPrivateApiHttpOptions());
    }

    isResultatsCloturables(rencontre:Rencontre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/isResultatsCloturables", this.authenticationService.getPrivateApiHttpOptions());
    }

    isPoursuiteEncodagePossible(rencontre:Rencontre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/isPoursuiteEncodagePossible", this.authenticationService.getPrivateApiHttpOptions());
    }

    isValidable(rencontre:Rencontre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/isValidable", this.authenticationService.getPrivateApiHttpOptions());
    }

    createRencontre(rencontre: Rencontre) {
        return this.http.post<Rencontre>(environment.privateApiUrl + "/rencontre", rencontre, this.authenticationService.getPrivateApiHttpOptions());
    }

    updateRencontre(rencontre: Rencontre) {
        return this.http.put<Rencontre>(environment.privateApiUrl + "/rencontre", rencontre, this.authenticationService.getPrivateApiHttpOptions());
    }

    updateResultatsEncodesRencontre(rencontre:Rencontre, resultatsEncodes:boolean, message:string){
        return this.http.put<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/resultatsEncodes?resultatsEncodes=" + resultatsEncodes, message, this.authenticationService.getPrivateApiHttpOptions());
    }

    updateValiditeRencontre(rencontre:Rencontre, validite:boolean, message:string){
        return this.http.put<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/validite?validite=" + validite, message, this.authenticationService.getPrivateApiHttpOptions());
    }

    getAutorisations(rencontre:Rencontre): Observable<AutorisationRencontre[]> {
        return this.http.get<AutorisationRencontre[]>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/autorisations", this.authenticationService.getPrivateApiHttpOptions());
    }

    canAuthoriseEncodage(rencontre:Rencontre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/canAuthoriseEncodage", this.authenticationService.getPrivateApiHttpOptions());
    }

    canAuthoriseValidation(rencontre:Rencontre) {
        return this.http.get<boolean>(environment.privateApiUrl + "/rencontre/" + rencontre.id + "/canAuthoriseValidation", this.authenticationService.getPrivateApiHttpOptions());
    }

    addAutorisationRencontre(autorisationRencontre:AutorisationRencontre){
        return this.http.post<AutorisationRencontre>(environment.privateApiUrl + "/rencontre/" + autorisationRencontre.rencontreFk + "/autorisation", autorisationRencontre, this.authenticationService.getPrivateApiHttpOptions());
    }

    deleteAutorisationRencontre(autorisationRencontre:AutorisationRencontre){
        return this.http.delete<boolean>(environment.privateApiUrl + "/rencontre/" + autorisationRencontre.rencontreFk + "/autorisation?autorisationRencontreId=" + autorisationRencontre.id, this.authenticationService.getPrivateApiHttpOptions());
    }

    creerCalendrier(championnatId: number){
        return this.http.post<Rencontre[]>(environment.privateApiUrl + "/rencontres/calendrier?championnatId=" + championnatId, null, this.authenticationService.getPrivateApiHttpOptions());
    }

    refreshCalendrier(championnatId: number){
        return this.http.put<Rencontre[]>(environment.privateApiUrl + "/rencontres/calendrier?championnatId=" + championnatId, null, this.authenticationService.getPrivateApiHttpOptions());
    }

    supprimerCalendrier(championnatId: number){
        return this.http.delete<Rencontre[]>(environment.privateApiUrl + "/rencontres/calendrier?championnatId=" + championnatId, this.authenticationService.getPrivateApiHttpOptions());
    }

    getInterseries(championnatId: number) {
      return this.http.get<Rencontre[]>(environment.privateApiUrl + "/rencontres/interseries?championnatId=" + championnatId, this.authenticationService.getPrivateApiHttpOptions());
    }

    getCalendrier(championnatId: number, excelFile:boolean){
      let options = this.authenticationService.getPrivateApiHttpOptions();
      options["responseType"] = "blob";
      return this.http.get(environment.publicApiUrl + "/rencontres/calendrier?championnatId=" + championnatId + "&excel="+excelFile,options);
    }

}
