import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customTime'
})

export class customTimePipe implements PipeTransform{

    transform(value: string, args: any[]) : string {
        
        //00d04:49:00
        if(Number(value.substring(0,2)) > 0){
            return Number(value.substring(0,2)) +" days " + Number(value.substring(3,5)) + ":" + value.substring(6,8);
        }else{
            return Number(value.substring(3,5)) + ":" + value.substring(6,8);
        }
        
        
    }
}