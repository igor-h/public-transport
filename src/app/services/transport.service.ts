import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TransportService {

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

  // return station names
  getStations( stationName: string ) {

    return this.getQuery(`locations?query=${ stationName }`)
              .pipe( map( data => data['stations'] 
                      .map(x => x.name ) ) );  // map list of objects to list of strings

  }


  getStationBoard( stationName: string, limit:number){
    return this.getQuery(`stationboard?station=${ stationName }&limit=${ limit }`)
              .pipe( map( data => data['stationboard'] ) );
  }

  getConnections(stationName1: string,stationName2: string, date?: string, time?:string ){
    if(date && time){
      return this.getQuery(`connections?from=${ stationName1 }&to=${ stationName2 }&date=${ date }&time=${ time }`)
                .pipe( map( data => data['connections'] ) );
    }
    else{
      return this.getQuery(`connections?from=${ stationName1 }&to=${ stationName2 }`)
      .pipe( map( data => data['connections'] ) );
    }
  }
}
