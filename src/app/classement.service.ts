import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs/Observable';
import { environment } from '../environments/environment';
import {Classement} from './classement';
import {ClassementClub} from './classementClub';

@Injectable()
export class ClassementService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getClassements(championnatId:number): Observable<Classement[]> {
    return this.http.get<Classement[]>(environment.publicApiUrl + "/classements?championnatId="+championnatId);
  }

  getClassementsClub(championnatId:number): Observable<ClassementClub[]> {
    return this.http.get<ClassementClub[]>(environment.publicApiUrl + "/classementsClub?championnatId="+championnatId);
  }
  
}
