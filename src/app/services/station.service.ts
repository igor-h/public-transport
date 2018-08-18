import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StationService {

  constructor(private http: HttpClient){ 
    console.log('Station Service works!');
  }

  getQuery( query: string ) {

    const url = `http://transport.opendata.ch/v1/${ query }`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.get(url, { headers });
  }

  getStations( stationName: string ) {

    return this.getQuery(`locations?query=${ stationName }`)
              .pipe( map( data => data['stations'] ));
  }
}
