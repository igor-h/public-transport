import {Component, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { StationService } from '../../services/station.service';


@Component({
  selector: 'app-station-board',
  templateUrl: './station-board.component.html',
  styles: [`.form-control { width: 300px; }`]
})
export class StationBoardComponent {

    stations:any;

    constructor(private _stationService: StationService) {
      console.log("constructor buscador");
    }

    model: any;
    searching = false;
    searchFailed = false;


    search = (text$: Observable<string>) =>
    text$.pipe(
      //debounceTime(300),  // delay of search
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(stationName =>
        this._stationService.getStations(stationName).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
            //return of([]).map((result) => el.name);
          }))
      ),
      tap(() => this.searching = false)
    );
 
     buscar(stationName:string) {
      this._stationService.getStations(stationName)
       .subscribe( (data:any) => {
           this.stations = data;
           console.log(this.stations)
         });
     }

}
