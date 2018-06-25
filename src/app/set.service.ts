import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {AuthenticationService} from './authentication.service';
import {Set} from './set';

@Injectable()
export class SetService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

    getMatchs(matchId: number): Observable<Set[]> {
        return this.http.get<Set[]>(environment.publicApiUrl + "/sets?matchId=" + matchId);
    }

    ajoutMatch(set: Set) {
        return this.http.post<Set>(environment.privateApiUrl + "/set", set, this.authenticationService.getPrivateApiHttpOptions());
    }

    updateMatch(set: Set) {
        return this.http.put<Set>(environment.privateApiUrl + "/set", set, this.authenticationService.getPrivateApiHttpOptions());
    }
    
    deleteMatch(set: Set) {
        return this.http.delete<Set>(environment.privateApiUrl + "/set?id=" + set.id, this.authenticationService.getPrivateApiHttpOptions());
    }
}