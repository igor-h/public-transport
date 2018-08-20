import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import { TransportService } from '../../../services/transport.service';


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
    currentPage = 1;
    maxPage: number;
    stationBoardList: any;

    constructor(private _transportService: TransportService) {
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
        this._transportService.getStations(stationName).pipe(
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
      this.onResetSearch();
    }

    blurStationChange(newVal: string){
      this.stationSelected = newVal;
      this.onResetSearch();
    }

    onResetSearch(){
      this.stationChange();
      this.currentPage = 1;
    }

    stationChange(){
      this._transportService.getStationBoard(this.stationSelected,50)
      .subscribe( (data:any) => {
        this.stationBoardList = data;
        console.log(this.stationBoardList)
        this.currentPage = 1;
      });
    }

    pageChange( value:number ){
        //itemsPerPage: pageSelected, currentPage: currentPage, totalItems: stationBoardList?.length
        let minPage = 1;
        this.maxPage = Math.ceil(this.stationBoardList.length / this.pageSelected);

        if ( this.maxPage < (this.currentPage + value )){ 
          return;
        }
        if (minPage > (this.currentPage + value) ){
          return;
        }else{
          this.currentPage = this.currentPage + value;
        }
    }

}
