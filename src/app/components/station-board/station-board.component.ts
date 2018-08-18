import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { StationService } from '../../services/station.service';


@Component({
  selector: 'app-station-board',
  templateUrl: './station-board.component.html',
  styles: [`.form-control { width: 300px; }`]
})
export class StationBoardComponent implements OnInit {

    stationSelected: string;
    searching = false;
    searchFailed = false;
    pagesList = [5, 15, 20];
    pageSelected: number;
    stationBoardList: any;

    constructor(private _stationService: StationService) {
    }

    ngOnInit(){
      this.pageSelected = this.pagesList[0];
    }

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


    onPageChange(newPage: number){
      this.pageSelected = newPage;
      this.stationChange();
    }

    blurStationChange(newVal: string){
      this.stationSelected = newVal;
      this.stationChange();
    }

    stationChange(){
      this._stationService.getStationBoard(this.stationSelected,this.pageSelected)
      .subscribe( (data:any) => {
        this.stationBoardList = data;
        console.log(this.stationBoardList)
      });
    }

}
