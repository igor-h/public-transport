import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { TransportService } from '../../../services/transport.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JourneyComponent } from '../journey/journey.component';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html'
})
export class ConnectionsComponent  {

  departureSelected: string;
  destinationSelected: string;
  dateTimeText: Date;
  searchingDeparture = false;
  searchingDestination = false;
  searchFailedDeparture = true;
  searchFailedDestination = true;
  isSearching: boolean = false;
  invalidDateTime: boolean = false;
  connectionsList: any;


  constructor(private _transportService: TransportService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private modalService: NgbModal) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);

      if (params.departureParam && params.destinationParam) {
        this.searchFailedDeparture = false;
        this.searchFailedDestination = false;
      }

      this.departureSelected = params.departureParam;
      this.destinationSelected = params.destinationParam;

      this.search();
    })
  }

  open(item:any) {
    const modalRef = this.modalService.open(JourneyComponent, { size: 'lg' });
    modalRef.componentInstance.item = item;
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
      //debounceTime(3000),  // delay of search
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


  blurDepartureChange(newVal: string) {
    this.departureSelected = newVal;

    if (newVal) {
      this.searchFailedDeparture = false;
    }
  }

  blurDestinationChange(newVal: string) {
    this.destinationSelected = newVal;

    if (newVal) {
      this.searchFailedDestination = false;
    }
  }


  search() {
    try {
      this.isSearching = true;
      this.invalidDateTime = false;

      let date = this.datePipe.transform(this.dateTimeText, "yyyy-MM-dd");
      let time = this.datePipe.transform(this.dateTimeText, "HH:mm");

      if (!this.departureSelected || !this.destinationSelected) {
        this.isSearching = false;
        return;
      }

      if (date && time) {
        this._transportService.getConnections(this.departureSelected,
          this.destinationSelected, date, time)
          .subscribe((data: any) => {
            this.connectionsList = data;
            this.isSearching = false;
          });
      } else {
        this._transportService.getConnections(this.departureSelected, this.destinationSelected)
          .subscribe((data: any) => {
            this.connectionsList = data;
            this.isSearching = false;
          });
      }
    }
    catch (e) {
      console.log(e);
      this.isSearching = false;
      this.invalidDateTime = true;
    }
  }

}
