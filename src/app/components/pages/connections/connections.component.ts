import {Component, OnInit, Input} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { TransportService } from '../../../services/transport.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html'
})
export class ConnectionsComponent implements OnInit {

  departureSelected: string;
  destinationSelected: string;
  searchingDeparture = false;
  searchingDestination = false;
  searchFailedDeparture = false;
  searchFailedDestination = false;
  connectionsList: any;

  constructor(private _transportService: TransportService,
              private activatedRoute:ActivatedRoute) {
    this.activatedRoute.params.subscribe( params =>{
      console.log(params);
      this.departureSelected = params.departureParam;
      this.destinationSelected = params.destinationParam;
      
      this.search();
    })
  }

  ngOnInit(){
    
  }

  departure = (text$: Observable<string>) =>
  text$.pipe(
    //debounceTime(300),  // delay of search
    distinctUntilChanged(),
    tap(() => this.searchingDeparture = true),
    switchMap(stationName =>
      this._transportService.getStations(stationName).pipe(
        tap(() => this.searchFailedDeparture = false),
        catchError(() => {
          this.searchFailedDeparture = true;
          return of([]);
        }))
    ),
    tap(() => this.searchingDeparture = false)
  );

  destination = (text$: Observable<string>) =>
  text$.pipe(
    //debounceTime(300),  // delay of search
    distinctUntilChanged(),
    tap(() => this.searchingDestination = true),
    switchMap(stationName =>
      this._transportService.getStations(stationName).pipe(
        tap(() => this.searchFailedDestination = false),
        catchError(() => {
          this.searchFailedDestination = true;
          return of([]);
        }))
    ),
    tap(() => this.searchingDestination = false)
  );


  blurDepartureChange(newVal: string){
    this.departureSelected = newVal;
  }

  blurDestinationChange(newVal: string){
    this.destinationSelected = newVal;
  }


  search(){
    this._transportService.getConnections(this.departureSelected,this.destinationSelected)
    .subscribe( (data:any) => {
      this.connectionsList = data;
      console.log(this.connectionsList)
    });
  }

}
