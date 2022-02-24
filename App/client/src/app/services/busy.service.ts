import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {


busyRequestCount = 0
constructor(private spinner: NgxSpinnerService) { }

busy(){
  this.busyRequestCount++;
  this.spinner.show(
    undefined,
    {
      bdColor: 'rgb(0, 0, 0)',
      color: '#fff',
      type: 'ball-atom'
    }
  )
}

idle(){
  this.busyRequestCount--;
  if(this.busyRequestCount <= 0){
    this.busyRequestCount = 0;
    this.spinner.hide();
  }
}

}
